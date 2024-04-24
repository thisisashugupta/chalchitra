import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;
// TODO: add singleton prisma client

export const getPrismaClient = (): PrismaClient => {
  if (!prisma) {
    prisma = new PrismaClient();
    console.log('prisma client created');
  }
  return prisma;
};

export const cleanup = async (): Promise<void> => {
    if (prisma) {
      await prisma.$disconnect();
      console.log('prisma disconnected');
      
    }
};
