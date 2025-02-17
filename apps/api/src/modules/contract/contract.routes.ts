import { Router } from 'express';

import { validateProfile } from '../../middlewares/profile.middleware';
import { ContractController } from './contract.controller';

export const contractRouter = Router();

// Returns a list of contracts belonging to a user (client or contractor).
// The list should only contain non-terminated contracts.
contractRouter.get('/', validateProfile(), ContractController.listContracts);

// Return the contract only if it belongs to the profile making the request.
contractRouter.get('/:id', validateProfile(), ContractController.getContract);
