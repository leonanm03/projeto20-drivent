import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTypes, getTickets, createTicket } from '@/controllers';
import { createTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('*', authenticateToken)
  .get('/types', getTypes)
  .get('/', getTickets)
  .post('/', validateBody(createTicketSchema), createTicket);

export { ticketsRouter };
