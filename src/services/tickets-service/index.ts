import { TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';

export async function getTypes(): Promise<TicketType[]> {
  const types = await ticketsRepository.findMany();

  if (!types) {
    throw notFoundError();
  }

  return types;
}

const ticketsService = { getTypes };

export default ticketsService;
