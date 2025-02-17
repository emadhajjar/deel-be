import { Contract, ContractStatus, Job, Profile } from '../../model';
import { prepareTransaction } from '../../utils/transaction';

export const BalanceService = {
  async deposit(profile: Profile, amount: number) {
    return prepareTransaction(
      async (transaction) => {
        const totalUnpaidAmount = await Job.sum('price', {
          include: [
            {
              attributes: [],
              model: Contract,
              required: true,
              where: {
                ClientId: profile.id,
                status: ContractStatus.IN_PROGRESS,
              },
            },
          ],
          transaction,
          where: {
            paid: false,
          },
        } as any);

        const maxDeposit = totalUnpaidAmount / 4;

        if (amount >= maxDeposit) {
          throw 'Cannot deposit more than 25% your total of jobs to pay';
        }

        await profile.increment('balance', {
          by: amount,
          transaction,
        });
      },
      async () => {
        await profile.reload();
        return profile;
      },
    );
  },
};
