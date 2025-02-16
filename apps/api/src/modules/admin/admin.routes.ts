import { Router } from 'express';

import { validateData } from '../../middleware/validation.middleware';
import { AdminController } from './admin.controller';
import { getProfessionSchema } from './admin.schema';

export const adminRouter = Router();

// start=<date>&end=<date>

// Returns the profession that earned the most money
// (sum of jobs paid) for any contractor who worked within the specified time range.
adminRouter.get(
  '/best-profession',
  validateData(getProfessionSchema, true),
  AdminController.getProfession,
);

// Returns the clients who paid the most for jobs within the specified time period.
// The `limit` query parameter should be applied, and the default limit is 2.
adminRouter.get('/best-clients', AdminController.listClients);
