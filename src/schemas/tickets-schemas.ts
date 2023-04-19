import Joi from 'joi';
import { ticketTypeIdInput } from '@/services';

export const createTicketSchema = Joi.object(<ticketTypeIdInput>{
  ticketTypeId: Joi.number().required(),
});
