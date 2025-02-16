import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface ResponseLocals {
  profile: any;
}

export async function validateProfile<ResponseBody = any>(
  request: Request,
  response: Response<ResponseBody, ResponseLocals>,
  next: NextFunction,
) {
  const profileId = request.get('profile_id');

  if (profileId != undefined) {
    const { Profile } = request.app.get('models');

    const profile = await Profile.findOne({
      where: { id: profileId },
    });

    if (profile != undefined) {
      response.locals.profile = profile;
      return next();
    }
  }

  response.status(StatusCodes.UNAUTHORIZED).end();
}
