import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function findMany(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}
async function findTypeById(id: number): Promise<TicketType> {
  return prisma.ticketType.findUnique({
    where: {
      id,
    },
  });
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

async function findTicketById(id: number): Promise<Ticket> {
  return prisma.ticket.findUnique({
    where: {
      id,
    },
  });
}

async function updateTicket(id: number) {
  return prisma.ticket.update({
    where: {
      id,
    },
    data: {
      status: 'PAID',
    },
  });
}

const ticketsRepository = { findMany, findTickets, createTicket, findTicketById, findTypeById, updateTicket };

export default ticketsRepository;
