import { Hotel } from '@prisma/client';
import { notFoundError, paymentRequiredError } from '@/errors';
import { enrollmentRepository, hotelsRepository, ticketsRepository } from '@/repositories';

async function enrollmentAndTicketCheck(userId: number) {
  const enrollment = await enrollmentRepository.findenrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTickets(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.status !== 'PAID' || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote)
    throw paymentRequiredError();

  return;
}

async function getHotels(userId: number) {
  await enrollmentAndTicketCheck(userId);

  const hotels = await hotelsRepository.getHotels();
  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

async function getHotelbyId(userId: number, id: number) {
  await enrollmentAndTicketCheck(userId);

  const hotel = await hotelsRepository.getHotelbyId(id);
  if (!hotel) throw notFoundError();

  return hotel;
}

export type HotelIdParams = Pick<Hotel, 'id'>;

export const hotelsService = {
  getHotels,
  getHotelbyId,
};
