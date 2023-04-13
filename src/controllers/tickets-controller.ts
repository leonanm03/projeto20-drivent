import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTypes(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const types = await ticketsService.getTypes();
    res.status(httpStatus.OK).send(types);
  } catch (error) {
    next(error);
  }
}
