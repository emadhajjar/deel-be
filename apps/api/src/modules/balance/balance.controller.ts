import { Request, Response } from 'express';

import { prepareResponse } from '../../utils/response';
import { BalanceService } from './balance.service';

export const BalanceController = {
  async deposit(request: Request, response: Response) {
    await prepareResponse(() => {
      return BalanceService.deposit();
    }, response);
  },
};
