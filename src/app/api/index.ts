import { prisma } from '@/app/components/PrismaProvider';

async function main() {
    // ... you will write your Prisma Client queries here
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
}

async function main2() {
    await prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@prisma.io',
        videos: {},
        playlists: {},
        profile: {
          create: { bio: 'I like turtles' },
        },
      },
    })
  
    const allUsers = await prisma.user.findMany({
      include: {
        videos: true,
        playlists: true,
        profile: true,
      },
    })
    console.dir(allUsers, { depth: null })
  }

export async function dbcall() {

  try {
    await main()
  } 
  catch (error) {
    console.error(error)
    process.exit(1)
  }
  finally {
    await prisma.$disconnect()
  }
  
}