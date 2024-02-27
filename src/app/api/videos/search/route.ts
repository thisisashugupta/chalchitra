import { type NextRequest, NextResponse } from 'next/server';
import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();

export async function GET(request: NextRequest) {

    const searchParams = new URLSearchParams(request.nextUrl.search);
    const queryParam = searchParams.get('query');
    console.log("queryParam", queryParam);

    try {

    const response = await prisma.video.findMany({
        where: {
            title: {
                contains: `${queryParam?.toLowerCase()}`,
                mode: "insensitive",
            },
        },
        include: {
            author: {
                select: {
                    name: true,
                }
            }
        }
    });
    
    const videos = response.map(({ id, title, video_id, author, thumbnail_id }) => ({ id, title, video_id, thumbnail_id, name: author.name }));
    console.log("videos", videos);

    return NextResponse.json({ videos }, {status: 200});
    
    } catch (error) {
        console.error(error);
    } finally {
        await cleanup();
    }
}