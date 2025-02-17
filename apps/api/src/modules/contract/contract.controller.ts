import { Request, Response } from 'express';

import { ResponseLocals } from '../../interfaces/express.interface';
import { prepareResponse } from '../../utils/response';
import { ContractService } from './contract.service';

export const ContractController = {
  async getContract(request: Request, response: Response<any, ResponseLocals>) {
    await prepareResponse(() => {
      const contractId = Number(request.params.id);
      return ContractService.getContract(contractId, response.locals.profile.id);
    }, response);
  },

  async listContracts(request: Request, response: Response<any, ResponseLocals>) {
    await prepareResponse(() => {
      return ContractService.listContracts(response.locals.profile.id);
    }, response);
  },
};
