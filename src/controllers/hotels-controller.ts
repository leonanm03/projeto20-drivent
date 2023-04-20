import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    return res.status(httpStatus.OK).send();
  } catch (error) {
    next(error);
  }
}
