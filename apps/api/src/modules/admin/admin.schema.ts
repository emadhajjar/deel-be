import { z } from 'zod';

export const getProfessionSchema = z.object({
  end: z.string().datetime(),
  start: z.string().datetime(),
});
