import Joi from 'joi';
import { PaymentInput, TicketIdInput } from '@/services/payments-service';

export const ticketIdSchema = Joi.object<TicketIdInput>({
  ticketId: Joi.string()
    .regex(/^[0-9]+$/)
    .required(),
});

export const processPaymentSchema = Joi.object<PaymentInput>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.number().required(),
  }).required(),
});
