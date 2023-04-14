import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function getPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { ticketId } = req.query as { ticketId: string };

  try {
    const payment = await paymentsService.findFirst(parseInt(ticketId));
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    next(error);
  }
}
