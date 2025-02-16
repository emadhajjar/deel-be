import { Request, Response } from 'express';

import { prepareResponse } from '../../utils/response';
import { ContractService } from './contract.service';

export const ContractController = {
  async getContract(request: Request, response: Response) {
    await prepareResponse(() => {
      return ContractService.getContract();
    }, response);
  },

  async listContracts(request: Request, response: Response) {
    await prepareResponse(() => {
      return ContractService.listContracts();
    }, response);
  },
};
