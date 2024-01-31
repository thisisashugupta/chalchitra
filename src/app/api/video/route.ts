import { type NextRequest, NextResponse } from "next/server";
import s3Client from '@/app/providers/S3Provider';
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from '@/app/providers/PrismaProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

const bucketName = process.env.BUCKET_NAME!;

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


export async function DELETE(request : NextRequest) {

    const searchParams = request.nextUrl.searchParams;
    const video_id = searchParams.get('v');
    
    if(!video_id) return new NextResponse(JSON.stringify({ error: 'No such video.' }), { status: 404 });

    try {

        // Delete video from aws s3

        const input = {
            "Bucket": bucketName,
            "Key": video_id
        };

        const command = new DeleteObjectCommand(input);
        await s3Client.send(command);

        // Delete video from db
    
        const response = await prisma.video.delete({
            where: {
                video_id
            }
        });

        return new NextResponse(JSON.stringify(response), { status: 200 });

    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error. Failed to delete video.' }), { status: 500 });
    }
}
