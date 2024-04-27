import { type NextRequest, NextResponse } from "next/server"
import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient()

export async function GET(request : NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit')!) || 4
    const skip = parseInt(searchParams.get('skip')!) || 0

    try {
        const videos = await prisma.video.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                        photo: true
                    }
                }
            },
            take: limit,
            skip: skip,
            orderBy: {
                createdAt: 'desc',
            },
        })
        
        return new NextResponse(JSON.stringify({videos, total: videos.length}), { status: 200 })
        
    } catch (error) {

        console.error(error);
        return new NextResponse(JSON.stringify({ error: 'Failed to fetch videos.' }), { status: 500 });

    } finally {
        await cleanup();
    }
}