import { notFoundError, paymentRequiredError } from '@/errors';
import { enrollmentRepository, hotelsRepository, ticketsRepository } from '@/repositories';

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findenrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTickets(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.status !== 'PAID' || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote)
    throw paymentRequiredError();

  const hotels = await hotelsRepository.getHotels();
  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

export const hotelsService = {
  getHotels,
};
