import { Request, Response } from 'express';

import { prepareResponse } from '../../utils/response';
import { AdminService } from './admin.service';

export const AdminController = {
  async getProfession(request: Request, response: Response) {
    await prepareResponse(() => {
      const { end, start } = request.query as { end: string; start: string };
      const startDate = new Date(start);
      const endDate = new Date(end);

      return AdminService.getProfession(startDate, endDate);
    }, response);
  },

  async listClients(request: Request, response: Response) {
    await prepareResponse(() => {
      return AdminService.listClients();
    }, response);
  },
};
