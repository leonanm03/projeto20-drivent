import { prisma } from '@/config';

async function paymentTicketOwnerCheck(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
    select: { Ticket: { select: { Enrollment: true } } },
  });
}

async function findFirst(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

const paymentsRepository = { findFirst, paymentTicketOwnerCheck };

export default paymentsRepository;
