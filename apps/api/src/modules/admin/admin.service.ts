import { Dayjs } from 'dayjs';
import { col, fn, Op } from 'sequelize';

import { Contract, Job, Profile } from '../../model';

export const AdminService = {
  getBestProfession(startDate: Dayjs, endDate: Dayjs) {
    return Contract.findOne({
      attributes: [
        [col('Contractor.profession'), 'profession'],
        [fn('sum', col('price')), 'earned'],
      ],
      group: ['Contractor.profession'],
      include: [
        {
          attributes: [],
          model: Job,
          required: true,
          where: {
            paid: true,
            paymentDate: {
              [Op.between]: [startDate.toDate(), endDate.toDate()],
            },
          },
        },
        {
          as: 'Contractor',
          attributes: [],
          model: Profile,
          required: true,
        },
      ],
      order: [['earned', 'DESC'], 'id'],
      subQuery: false,
    });
  },

  listBestClients(startDate: Dayjs, endDate: Dayjs, limit: number) {
    return Contract.findAll({
      attributes: [
        ['ClientId', 'id'],
        [fn('concat', col('firstName'), ' ', col('lastName')), 'fullName'],
        [fn('sum', col('price')), 'paid'],
      ],
      group: ['Client.id'],
      include: [
        {
          attributes: [],
          model: Job,
          required: true,
          where: {
            paid: true,
            paymentDate: {
              [Op.between]: [startDate.toDate(), endDate.toDate()],
            },
          },
        },
        {
          as: 'Client',
          attributes: [],
          model: Profile,
          required: true,
        },
      ],
      limit,
      order: [['paid', 'DESC'], 'id'],
      subQuery: false,
    });
  },
};
