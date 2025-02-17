import { Router } from 'express';

import { validateProfile } from '../../middlewares/profile.middleware';
import { validateData } from '../../middlewares/validation.middleware';
import { ProfileType } from '../../model';
import { BalanceController } from './balance.controller';
import { BalanceSchema } from './balance.schema';

export const balanceRouter = Router();

// Deposit money into a client's balance.
// A client cannot deposit more than 25% of the total of jobs to pay at the time of deposit.
balanceRouter.post(
  '/deposit/:userId',
  validateProfile(ProfileType.CLIENT, 'userId'),
  validateData(BalanceSchema.deposit),
  BalanceController.deposit,
);
