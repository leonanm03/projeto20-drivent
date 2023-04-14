import { TicketType } from '@prisma/client';
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

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: 'RESERVED',
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketsRepository = { findMany, findTickets, createTicket };

export default ticketsRepository;
