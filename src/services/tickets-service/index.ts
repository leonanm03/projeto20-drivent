import { Ticket, TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import { enrollmentRepository, ticketsRepository } from '@/repositories';

async function getTypes(): Promise<TicketType[]> {
  const types = await ticketsRepository.findMany();

  if (!types) {
    throw notFoundError();
  }

  return types;
}

async function getTickets(userId: number) {
  const enrollment = await enrollmentRepository.findenrollmentByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.findTickets(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }
  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findenrollmentByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketsRepository.createTicket(enrollment.id, ticketTypeId);

  return ticket;
}

export type ticketTypeIdInput = Pick<Ticket, 'ticketTypeId'>;

export const ticketsService = { getTypes, getTickets, createTicket };
