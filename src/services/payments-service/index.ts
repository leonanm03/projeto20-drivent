import { Payment } from '@prisma/client';
import { notFoundError, unauthorizedError } from '@/errors';
import paymentsRepository from '@/repositories/payments-repository';
import ticketsRepository from '@/repositories/tickets-repository';

export async function getPayment(ticketId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const paymentOwner = await paymentsRepository.paymentTicketOwnerCheck(ticketId);
  if (!paymentOwner) {
    throw unauthorizedError();
  }

  const types = await paymentsRepository.findFirst(ticketId);

  return types;
}

export type TicketIdInput = Pick<Payment, 'ticketId'>;

const paymentsService = { getPayment };

export default paymentsService;
