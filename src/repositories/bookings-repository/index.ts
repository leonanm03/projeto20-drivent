import { Booking } from '.prisma/client';
import { prisma } from '@/config';

async function postBooking(userId: number, roomId: number): Promise<Booking> {
  return prisma.booking.create({ data: { userId, roomId } });
}

export const bookingsRepository = { postBooking };
