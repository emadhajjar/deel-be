import { Request, Response } from 'express';

import { prepareResponse } from '../../utils/response';
import { JobService } from './job.service';

export const JobController = {
  async listUnpaidJobs(request: Request, response: Response) {
    await prepareResponse(() => {
      return JobService.listUnpaidJobs();
    }, response);
  },

  async payJob(request: Request, response: Response) {
    await prepareResponse(() => {
      return JobService.payJob();
    }, response);
  },
};
