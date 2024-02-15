import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;

export const getPrismaClient = (): PrismaClient => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};

export const cleanup = async (): Promise<void> => {
    if (prisma) {
      await prisma.$disconnect();
      console.log('prisma disconnected');
      
    }
};

// import { PrismaClient } from '@prisma/client';

// export const prisma = new PrismaClient();

// export async function cleanup() {
    // await prisma.$disconnect();
// }