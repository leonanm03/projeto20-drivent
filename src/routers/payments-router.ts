import { Router } from 'express';
import { authenticateToken, validateBody, validateQuery } from '@/middlewares';
import { getPayment, processPayment } from '@/controllers';
import { processPaymentSchema, ticketIdSchema } from '@/schemas';

const paymentsRouter = Router();

paymentsRouter
  .all('*', authenticateToken)
  .get('/', validateQuery(ticketIdSchema), getPayment)
  .post('/process', validateBody(processPaymentSchema), processPayment);

export { paymentsRouter };
