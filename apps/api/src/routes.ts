import { Router } from 'express';

import { adminRouter } from './modules/admin/admin.routes';
import { balanceRouter } from './modules/balance/balance.routes';
import { contractRouter } from './modules/contract/contract.routes';
import { jobRouter } from './modules/job/job.routes';

export const routes = Router();

routes.use('/admin', adminRouter);
routes.use('/balances', balanceRouter);
routes.use('/contracts', contractRouter);
routes.use('/jobs', jobRouter);
