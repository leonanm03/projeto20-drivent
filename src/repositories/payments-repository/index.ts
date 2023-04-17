import { prisma } from '@/config';
import { PaymentData } from '@/protocols';

async function findFirst(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment({ ticketId, cardIssuer, cardLastDigits, value }: PaymentData) {
  return prisma.payment.create({ data: { ticketId, cardIssuer, cardLastDigits, value } });
}

const paymentsRepository = { findFirst, createPayment };

export default paymentsRepository;
