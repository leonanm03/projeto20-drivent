import { Booking, Room } from '.prisma/client';
import { prisma } from '@/config';

async function postBooking(userId: number, roomId: number): Promise<Booking> {
  return prisma.booking.create({ data: { userId, roomId } });
}

async function getBooking(userId: number): Promise<Booking & { Room: Room }> {
  return prisma.booking.findFirst({ where: { userId }, include: { Room: true } });
}

export const bookingsRepository = { postBooking, getBooking };
