import { type NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/app/providers/PrismaProvider';
import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();

export async function POST(request: NextRequest) {

    try {

    const response = await prisma.video.findMany({
        include: {
            author: {
                select: {
                    name: true,
                }
            }
        }
    });
    
    const videos = response.map(({ id, title, video_id, author }) => ({ id, title, video_id, name: author.name }));

    return NextResponse.json({ videos }, {status: 200});
    
    } catch (error) {
        console.error(error);
    } finally {
        await cleanup();
}
}