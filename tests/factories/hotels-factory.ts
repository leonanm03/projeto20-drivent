import { Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

export async function createHotel(name: string, image: string): Promise<Hotel> {
  return prisma.hotel.create({
    data: { name, image },
  });
}

export async function createRoom(name: string, capacity: number, hotelId: number): Promise<Room> {
  return prisma.room.create({
    data: { name, capacity, hotelId },
  });
}
