import Joi from 'joi';
import { ticketTypeIdInput } from '@/protocols';

export const createTicketSchema = Joi.object<ticketTypeIdInput>({
  ticketTypeId: Joi.number().required(),
});
