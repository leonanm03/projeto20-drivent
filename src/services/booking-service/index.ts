import { Booking } from '.prisma/client';
import { forbiddenError, notFoundError } from '@/errors';
import { bookingRepository, enrollmentRepository, hotelsRepository, ticketsRepository } from '@/repositories';

async function enrollmentAndTicketCheck(userId: number) {
  const enrollment = await enrollmentRepository.findenrollmentByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTickets(enrollment.id);
  if (!ticket) throw notFoundError();

  if (ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw forbiddenError();

  return;
}

async function postBooking(userId: number, roomId: number) {
  await enrollmentAndTicketCheck(userId);

  const room = await hotelsRepository.getRoomWithBookings(roomId);
  if (!room) throw notFoundError();
  if (room.capacity <= room.Booking.length) throw forbiddenError();

  const booking = await bookingRepository.postBooking(userId, roomId);
  return booking;
}

async function getBooking(userId: number) {
  await enrollmentAndTicketCheck(userId);

  const booking = await bookingRepository.getBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  await enrollmentAndTicketCheck(userId);

  const room = await hotelsRepository.getRoomWithBookings(roomId);
  if (!room) throw notFoundError();
  if (room.capacity <= room.Booking.length) throw forbiddenError();

  const booking = await bookingRepository.updateBooking(userId, bookingId, roomId);
  if (!booking) throw notFoundError();

  return booking;
}

export type RoomIdParam = Pick<Booking, 'roomId'>;
export type BookingIdParam = { bookingId: number };

export const bookingsService = {
  postBooking,
  getBooking,
  updateBooking,
};
