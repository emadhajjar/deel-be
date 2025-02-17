import dayjs from "dayjs";
import { Op } from 'sequelize';

import { Contract, ContractStatus, Job, Profile } from '../../model';
import { prepareTransaction } from '../../utils/transaction';

export const JobService = {
  async listUnpaidJobs(profileId: number) {
    return Job.findAll({
      include: {
        attributes: [],
        model: Contract,
        required: true,
        where: {
          [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
          status: {
            [Op.not]: ContractStatus.TERMINATED,
          },
        },
      },
      where: {
        paid: false,
      },
    });
  },

  async payJob(clientProfile: Profile, jobId: number) {
    return prepareTransaction(
      async (transaction) => {
        const job = await Job.findOne({
          include: {
            model: Contract,
            where: {
              ClientId: clientProfile.id,
            },
          },
          rejectOnEmpty: true,
          where: {
            id: jobId,
            paid: false,
          },
        });

        if (clientProfile.balance < job.price) {
          throw 'The client does not have enough funds on their balance';
        }

        const contractorProfile = await Profile.findOne({
          rejectOnEmpty: true,
          where: {
            id: job.Contract?.ContractorId,
          },
        });

        await Promise.all([
          contractorProfile.increment('balance', {
            by: job.price,
            transaction,
          }),
          clientProfile.decrement('balance', {
            by: job.price,
            transaction,
          }),
          job.update(
            {
              paid: true,
              paymentDate: dayjs().toDate(),
            },
            {
              transaction,
            },
          ),
        ]);
      },
      async () => {
        await clientProfile.reload();
        return {
          balance: clientProfile.balance,
          profileId: clientProfile.id,
        };
      },
    );
  },
};
