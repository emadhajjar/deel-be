import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z, ZodError } from 'zod';

export function validateData(schema: z.ZodObject<any, any>, query = false) {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse(query ? request.query : request.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));

        response.status(StatusCodes.BAD_REQUEST).json({
          details: errorMessages,
          error: 'Invalid data',
          success: false,
        });
      } else {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: 'Internal Server Error',
          success: false,
        });
      }
    }
  };
}
