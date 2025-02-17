import dayjs from 'dayjs';
import { z } from 'zod';

export const AdminSchema = {
  getBestProfession: z
    .object({
      end: z
        .string()
        .datetime()
        .transform((value) => dayjs(value)),
      start: z
        .string()
        .datetime()
        .transform((value) => dayjs(value)),
    })
    .refine((data) => data.end.isAfter(data.start), {
      message: 'Earlier than start',
      path: ['end'],
    }),

  listBestClients: z
    .object({
      end: z
        .string()
        .datetime()
        .transform((value) => dayjs(value)),
      limit: z.optional(z.coerce.number().int()).default(2),
      start: z
        .string()
        .datetime()
        .transform((value) => dayjs(value)),
    })
    .refine((data) => data.end.isAfter(data.start), {
      message: 'Earlier than start',
      path: ['end'],
    }),
};
