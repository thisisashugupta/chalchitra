"use server"
// Fetches feed videos data and renders it in a grid layout, provides it to Card component
import { type Video, type User }  from '@prisma/client'
import Card from '@/components/Card'

import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();

const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION
const thumbnailUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/thumbnails`

type FeedVideo = Partial<Video> & { author: Partial<User> }

export default async function Feed() {

    let videos : FeedVideo[] | null = null;
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
            }
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

    return (
        <div className={`
            md:mx-4 md:my-6 
            grid grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            2xl:grid-cols-5 
            3xl:grid-cols-5 
            4xl:grid-cols-6
        `}>
            {videos.map((video : FeedVideo) => (
                <div key={video.id}>
                    <Card video={video} thumbnailUrl={thumbnailUrl} />
                </div>
            ))}
        </div>
    )
}