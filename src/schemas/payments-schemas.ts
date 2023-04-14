import Joi from 'joi';
import { TicketIdInput } from '@/services/payments-service';

export const ticketIdSchema = Joi.object<TicketIdInput>({
  ticketId: Joi.string()
    .regex(/^[0-9]+$/)
    .required(),
});
