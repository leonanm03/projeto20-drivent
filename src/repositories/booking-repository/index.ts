import { Booking, Room } from '.prisma/client';
import { prisma } from '@/config';

async function postBooking(userId: number, roomId: number): Promise<Booking> {
  return prisma.booking.create({ data: { userId, roomId } });
}

async function getBooking(userId: number): Promise<Booking & { Room: Room }> {
  return prisma.booking.findFirst({ where: { userId }, include: { Room: true } });
}

async function getUserBooking(userId: number, bookingId: number): Promise<Booking> {
  return prisma.booking.findFirst({ where: { userId, id: bookingId } });
}

async function updateBooking(userId: number, bookingId: number, roomId: number): Promise<Booking> {
  return prisma.booking.update({ where: { id: bookingId }, data: { userId, roomId } });
}

export const bookingRepository = { postBooking, getBooking, updateBooking, getUserBooking };
