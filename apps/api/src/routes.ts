import { Router } from 'express';

import { getProfile } from './middleware/getProfile';

export const routes = Router();
routes.get('/contracts/:id', getProfile);
