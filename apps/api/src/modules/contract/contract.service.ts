import { Op } from 'sequelize';

import { Contract, ContractStatus } from '../../model';

export const ContractService = {
  async getContract(contractId: number, profileId: number) {
    return Contract.findOne({
      where: {
        id: contractId,
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      },
    });
  },

  async listContracts(profileId: number) {
    return Contract.findAll({
      where: {
        [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
        status: {
          [Op.ne]: ContractStatus.TERMINATED,
        },
      },
    });
  },
};
