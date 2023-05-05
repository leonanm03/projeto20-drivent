import faker from '@faker-js/faker';
import { Hotel, Room } from '@prisma/client';
import { createFakeBooking } from './bookings-factory';
import { prisma } from '@/config';

export async function createHotel(): Promise<Hotel> {
  return prisma.hotel.create({
    data: { name: faker.name.findName(), image: faker.image.imageUrl() },
  });
}

export async function createRoom(hotelId: number): Promise<Room> {
  return prisma.room.create({
    data: { name: faker.name.findName(), capacity: faker.datatype.number(), hotelId },
  });
}

export async function createRoomWithLimit(hotelId: number, limit: number): Promise<Room> {
  return prisma.room.create({
    data: { name: faker.name.findName(), capacity: limit, hotelId },
  });
}

export function createFakeHotel() {
  return {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    image: faker.image.imageUrl(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
}

export function createFakeRoom({ capacity = 2, hotelId = 1 } = {}) {
  return {
    id: 1,
    name: faker.name.findName(),
    capacity,
    hotelId,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    Booking: [createFakeBooking({ roomId: 1, Room: { id: 1, name: faker.name.findName(), capacity, hotelId } })],
  };
}
