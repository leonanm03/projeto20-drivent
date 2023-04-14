import { Ticket, TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

export async function getTypes(): Promise<TicketType[]> {
  const types = await ticketsRepository.findMany();

  if (!types) {
    throw notFoundError();
  }

  return types;
}

export async function getTickets(userId: number) {
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

const ticketsService = { getTypes, getTickets };

export default ticketsService;
