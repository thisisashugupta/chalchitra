"use server"
// Fetches feed videos data and provides it to FeedClient component

import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient()
import { VideoWithAuthor } from '@/types/video'
import FeedClient from "./FeedClient"

export default async function Feed() {

    let videos : VideoWithAuthor[] | null = null;
    let isError = false;

    try {
        const response = await prisma.video.findMany({
            include: {
                author: {
                    select: {
                        name: true,
                        photo: true
                    }
                }
            },
            take: 5,
            orderBy: {
                createdAt: 'desc',
            },
        });
        videos = response
    } catch (error) {
        console.error(error);
        isError = true;
    } finally {
        await cleanup();
    }

    if (isError) return (<main className="p-4"><p className="text-center">Error fetching videos</p></main>);

    if (!videos) return (<main className="p-4"><p className="text-center">No Videos</p></main>);

    return (<FeedClient videos={videos} isError={isError} />)
}
