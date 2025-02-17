import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ResponseLocals } from '../interfaces/express.interface';
import { Profile, ProfileType } from '../model';

export function validateProfile(profileType?: ProfileType, parameterName?: string) {
  return async (request: Request, response: Response<any, ResponseLocals>, next: NextFunction) => {
    const profileId =
      parameterName == undefined ? request.get('profile_id') : request.params[parameterName];

    if (profileId != undefined) {
      const profile = await Profile.findOne({
        where: { id: profileId },
      });

      if (profile != undefined) {
        response.locals.profile = profile;

        if (profileType != undefined && profile.type !== profileType) {
          response.status(StatusCodes.UNAUTHORIZED).json({
            error: `Invalid profile type ${profileType}`,
            success: false,
          });
        }

        return next();
      }
    }

    response.status(StatusCodes.UNAUTHORIZED).json({
      error: `Invalid profile`,
      success: false,
    });
  };
}
