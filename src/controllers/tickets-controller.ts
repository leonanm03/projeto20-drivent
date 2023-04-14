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

export async function getTickets(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };

  try {
    const tickets = await ticketsService.getTickets(userId);
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    next(error);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req as { userId: number };
  const { ticketTypeId } = req.body as { ticketTypeId: number };
  try {
    const ticket = await ticketsService.createTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    next(error);
  }
}
