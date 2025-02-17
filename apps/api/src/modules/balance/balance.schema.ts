import { z } from 'zod';

export const BalanceSchema = {
  deposit: z.object({
    amount: z.coerce.number().min(1),
  }),
};
