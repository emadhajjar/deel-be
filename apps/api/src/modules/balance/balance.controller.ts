import { Request, Response } from 'express';
import { z } from 'zod';

import { ResponseLocals } from '../../interfaces/express.interface';
import { prepareResponse } from '../../utils/response';
import { BalanceSchema } from './balance.schema';
import { BalanceService } from './balance.service';

type DepositBody = z.infer<typeof BalanceSchema.deposit>;

export const BalanceController = {
  async deposit(request: Request, response: Response<any, ResponseLocals>) {
    await prepareResponse(() => {
      const { amount } = request.body as DepositBody;

      return BalanceService.deposit(response.locals.profile, amount);
    }, response);
  },
};
