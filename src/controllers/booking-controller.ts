import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { bookingsService } from '@/services';

export async function postBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const { roomId } = req.body as { roomId: number };
  try {
    const { id } = await bookingsService.postBooking(userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: id });
  } catch (error) {
    next(error);
  }
}

export async function getBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    const { id, Room } = await bookingsService.getBooking(userId);
    return res.status(httpStatus.OK).send({ id, Room });
  } catch (error) {
    next(error);
  }
}
