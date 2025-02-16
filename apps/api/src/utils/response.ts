import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function prepareResponse(callback: () => any, response: Response) {
  try {
    const data = await callback();
    if (data == undefined) {
      response.status(StatusCodes.NOT_FOUND).json({
        message: 'Not Found',
        success: false,
      });
    } else {
      response.status(StatusCodes.OK).json({
        data,
        success: true,
      });
    }
  } catch (error) {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error,
      success: false,
    });
  }
}
