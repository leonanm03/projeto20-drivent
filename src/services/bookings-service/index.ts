import { bookingsRepository } from '@/repositories';

async function postBooking(userId: number, roomId: number) {
  const booking = await bookingsRepository.postBooking(userId, roomId);

  return booking;
}

export const bookingsService = {
  postBooking,
};
