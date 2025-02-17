import { Request, Response } from 'express';
import { z } from 'zod';

import { prepareResponse } from '../../utils/response';
import { AdminSchema } from './admin.schema';
import { AdminService } from './admin.service';

type GetBestProfessionQuery = z.infer<typeof AdminSchema.getBestProfession>;
type ListBestClientsQuery = z.infer<typeof AdminSchema.listBestClients>;

export const AdminController = {
  async getBestProfession(request: Request, response: Response) {
    await prepareResponse(() => {
      const { end, start } = request.query as unknown as GetBestProfessionQuery;

      return AdminService.getBestProfession(start, end);
    }, response);
  },

  async listClients(request: Request, response: Response) {
    await prepareResponse(() => {
      const { end, limit, start } = request.query as unknown as ListBestClientsQuery;

      return AdminService.listBestClients(start, end, limit);
    }, response);
  },
};
