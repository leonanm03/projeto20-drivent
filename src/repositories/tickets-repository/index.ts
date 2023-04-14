import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function findMany(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketsRepository = { findMany, findTickets };

export default ticketsRepository;
