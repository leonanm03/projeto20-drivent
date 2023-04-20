import { prisma } from '@/config';

async function getHotels() {
  return prisma.hotel.findMany();
}

async function getHotelbyId(id: number) {
  return prisma.hotel.findUnique({ where: { id } });
}

export const hotelsRepository = { getHotels, getHotelbyId };
