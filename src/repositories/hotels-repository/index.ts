import { prisma } from '@/config';

async function getHotels() {
  return prisma.hotel.findMany();
}

export const hotelsRepository = { getHotels };
