import { prisma } from '@/config';

async function findFirst(ticketId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketId,
    },
  });
}

const paymentsRepository = { findFirst };

export default paymentsRepository;
