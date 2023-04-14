import paymentsRepository from '@/repositories/payments-repository';

export async function findFirst(ticketId: number) {
  const types = await paymentsRepository.findFirst(ticketId);

  return types;
}

const paymentsService = { findFirst };

export default paymentsService;
