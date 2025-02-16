import { Router } from 'express';

import { validateProfile } from '../../middleware/profile.middleware';
import { JobController } from './job.controller';

export const jobRouter = Router();

// Get all unpaid jobs for a user (**_either_** a client or contractor),
// but only for **_active contracts_**.
jobRouter.get('/unpaid', validateProfile, JobController.listUnpaidJobs);

// Pay for a job. A client can only pay if their balance is greater than or equal to the amount due.
// The payment amount should be moved from the client's balance to the contractor's balance.
jobRouter.post('/:job_id/pay', validateProfile, JobController.payJob);
