import { Booking } from '@prisma/client';
import { prisma } from '@/config';

export async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
    include: {
      Room: true,
    },
  });
}

export function createFakeBooking({
  userId = 1,
  roomId = 1,
  Room = {
    id: 1,
    name: 'Room 1',
    capacity: 1,
    hotelId: 1,
  },
} = {}) {
  return {
    id: 1,
    userId,
    roomId,
    createdAt: new Date(),
    updatedAt: new Date(),
    Room: {
      ...Room,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
}
