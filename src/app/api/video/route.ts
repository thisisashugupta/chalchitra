import { type NextRequest, NextResponse } from "next/server"
import { prisma } from '@/app/components/PrismaProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export async function GET(request : NextRequest) {

    const searchParams = request.nextUrl.searchParams;
    const video_id = searchParams.get('v');
    
    if(!video_id) return new NextResponse(JSON.stringify({ error: 'No such video.' }), { status: 404 });

    try {
        const response = await prisma.video.findUnique({
            where: {
                video_id
            }
        });

        return new NextResponse(JSON.stringify(response), { status: 200 });;

    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error. Failed to fetch video.' }), { status: 500 });
    }
}


export async function POST(request : NextRequest) {

    const session = await getServerSession(authOptions);
    const email = session?.user?.email!;
  
    const requestBody = await request.json();
    console.log('requestBody', requestBody);
    const { title, description, video_id } = requestBody;
    
  
    const newVideo = await prisma.video.create({
      data: {
        title: title,
        content: description,
        video_id: video_id,
        published: true,
        author: {
          connect: {
            email: email,
          },
        },
      },
    });
  
    try {
        return new NextResponse(JSON.stringify({
            message: `Video added successfully.`
        }), { status: 200 });
        
    } catch (error) {
  
        console.error(error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error. Failed to Add video.' }), { status: 500 });
  
    }
  }