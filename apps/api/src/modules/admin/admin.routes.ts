import { Router } from 'express';

import { validateData } from '../../middlewares/validation.middleware';
import { AdminController } from './admin.controller';
import { AdminSchema } from './admin.schema';

export const adminRouter = Router();

// Returns the profession that earned the most money
// (sum of jobs paid) for any contractor who worked within the specified time range.
adminRouter.get(
  '/best-profession',
  validateData(AdminSchema.getBestProfession, true),
  AdminController.getBestProfession,
);

// Returns the clients who paid the most for jobs within the specified time period.
// The `limit` query parameter should be applied, and the default limit is 2.
adminRouter.get(
  '/best-clients',
  validateData(AdminSchema.listBestClients, true),
  AdminController.listClients,
);
