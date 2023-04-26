import { prisma } from '@/config';

async function postBooking(userId: number, roomId: number) {
  return prisma.booking.create({ data: { userId, roomId } });
}

export const bookingsRepository = { postBooking };
