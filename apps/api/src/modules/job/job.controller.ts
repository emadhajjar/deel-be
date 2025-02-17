import { Request, Response } from 'express';

import { ResponseLocals } from '../../interfaces/express.interface';
import { prepareResponse } from '../../utils/response';
import { JobService } from './job.service';

export const JobController = {
  async listUnpaidJobs(request: Request, response: Response<any, ResponseLocals>) {
    await prepareResponse(() => {
      return JobService.listUnpaidJobs(response.locals.profile.id);
    }, response);
  },

  async payJob(request: Request, response: Response<any, ResponseLocals>) {
    await prepareResponse(() => {
      const jobId = Number(request.params.job_id);
      return JobService.payJob(response.locals.profile, jobId);
    }, response);
  },
};
