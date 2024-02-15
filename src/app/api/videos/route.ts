import { type NextRequest, NextResponse } from "next/server"
// import { prisma } from '@/app/providers/PrismaProvider';
import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function GET(request : NextRequest) {

    const session = await getServerSession(authOptions);
    const email = session?.user?.email!;
    const searchParams = request.nextUrl.searchParams;

    const limit = parseInt(searchParams.get('limit')!) || 10;
    const offset = parseInt(searchParams.get('offset')!) || 0;

    try {

      const data = await prisma.user.findUnique({
        where: { email },
        include: {
          videos: {
            take: limit,
            skip: offset,
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });

      // console.log('prisma data', data);
        return new NextResponse(JSON.stringify({
            data: data?.videos,
            message: `${data?.videos.length} Videos fetched successfully.`
        }), { status: 200 });
        
    } catch (error) {

        console.error(error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error. Failed to fetch videos.' }), { status: 500 });

    } finally {
        await cleanup();
    }
}