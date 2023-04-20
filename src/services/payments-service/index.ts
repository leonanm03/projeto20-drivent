import { Payment } from '@prisma/client';
import { notFoundError, unauthorizedError } from '@/errors';
import { CardData } from '@/protocols';
import { enrollmentRepository, paymentsRepository, ticketsRepository } from '@/repositories';

export async function getPayment(userId: number, ticketId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }
  const enrollment = await enrollmentRepository.findenrollmentByUserId(userId);

  if (enrollment.id !== ticket.enrollmentId) {
    throw unauthorizedError();
  }

  const payment = await paymentsRepository.findFirst(ticketId);

  return payment;
}

export async function processPayment(userId: number, ticketId: number, cardData: CardData) {
  const ticket = await ticketsRepository.findTicketById(ticketId);
  if (!ticket) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.findenrollmentByUserId(userId);

  if (enrollment.id !== ticket.enrollmentId) {
    throw unauthorizedError();
  }

  const tickeType = await ticketsRepository.findTypeById(ticket.ticketTypeId);

  const payment = await paymentsRepository.createPayment({
    ticketId,
    value: tickeType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toLocaleString().slice(-4),
  });

  await ticketsRepository.updateTicket(ticketId);

  return payment;
}

export type TicketIdInput = Pick<Payment, 'ticketId'>;

export type PaymentInput = {
  ticketId: TicketIdInput;
  cardData: CardData;
};

export const paymentsService = { getPayment, processPayment };
