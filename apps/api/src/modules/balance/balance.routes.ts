import { Router } from 'express';

import { validateProfile } from '../../middleware/profile.middleware';
import { BalanceController } from './balance.controller';

export const balanceRouter = Router();

// Deposit money into a client's balance.
// A client cannot deposit more than 25% of the total of jobs to pay at the time of deposit.
balanceRouter.post('/deposit/:userId', validateProfile, BalanceController.deposit);
