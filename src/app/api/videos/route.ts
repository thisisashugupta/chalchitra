import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function GET(request : NextRequest) {

    const prisma = new PrismaClient()
    const session = await getServerSession(authOptions);
    const email = session?.user?.email!;
    const searchParams = request.nextUrl.searchParams;

    const limit = parseInt(searchParams.get('limit')!) || 10;
    const offset = parseInt(searchParams.get('offset')!) || 0;

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

    console.log('prisma data', data);
    
    try {
        return new NextResponse(JSON.stringify({
            data: data?.videos,
            message: `${data?.videos.length} Videos fetched successfully.`
        }), { status: 200 });
        
    } catch (error) {

        console.error(error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error. Failed to fetch videos.' }), { status: 500 });

    }
}

export async function POST(request : NextRequest) {

  const prisma = new PrismaClient()
  const session = await getServerSession(authOptions);
  const email = session?.user?.email!;

  const requestBody = await request.json();
  console.log('requestBody', requestBody);
  const { title, description, videoUrl } = requestBody;
  

  const newVideo = await prisma.video.create({
    data: {
      title: title,
      content: description,
      url: videoUrl,
      published: true,
      author: {
        connect: {
          email: email,
        },
      },
    },
  });

  console.log('prisma data', newVideo);
  
  try {
      return new NextResponse(JSON.stringify({
          data: "newVideo",
          message: `Video added successfully.`
      }), { status: 200 });
      
  } catch (error) {

      console.error(error);
      return new NextResponse(JSON.stringify({ error: 'Internal Server Error. Failed to fetch videos.' }), { status: 500 });

  }
}