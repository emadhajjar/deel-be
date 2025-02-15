import { Router } from 'express';

import { getProfile } from './middleware/getProfile';

export const routes = Router();

// TODO: **_GET_** `/contracts/:id` - This API is broken 😵! It should return the contract only if it belongs to the profile making the request. Better fix that!
routes.get('/contracts/:id', getProfile);

// TODO: **_GET_** `/contracts` - Returns a list of contracts belonging to a user (client or contractor). The list should only contain non-terminated contracts.
routes.get('/contracts', getProfile);

// TODO: **_GET_** `/jobs/unpaid` - Get all unpaid jobs for a user (**_either_** a client or contractor), but only for **_active contracts_**.
routes.get('/jobs/unpaid', getProfile);

// TODO: **_POST_** `/jobs/:job_id/pay` - Pay for a job. A client can only pay if their balance is greater than or equal to the amount due. The payment amount should be moved from the client's balance to the contractor's balance.
routes.post('/jobs/:job_id/pay', getProfile);

// TODO: **_POST_** `/balances/deposit/:userId` - Deposit money into a client's balance. A client cannot deposit more than 25% of the total of jobs to pay at the time of deposit.
routes.post('/balances/deposit/:userId', getProfile);

// TODO: **_GET_** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money (sum of jobs paid) for any contractor who worked within the specified time range.
routes.get('/admin/best-profession', getProfile);

// TODO: **_GET_** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - Returns the clients who paid the most for jobs within the specified time period. The `limit` query parameter should be applied, and the default limit is 2.
routes.get('/admin/best-clients', getProfile);
