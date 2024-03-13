"use server"

import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();
import Link from 'next/link';
import { Video }  from '@prisma/client'
import Card from '@/components/Card'

const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION
const thumbnailUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/thumbnails`

export default async function Feed() {

    let videos : any[] | null = null;
    let isError = false;

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
        
        videos = response.map(({ id, title, video_id, thumbnail_id, author }) => ({ id, title, video_id, thumbnail_id, name: author.name }));
        
    } catch (error) {
        console.error(error);
        isError = true;
    } finally {
        await cleanup();
    }

    if(isError) return (<main className="p-4"><p className="text-center">Error fetching videos</p></main>);

    if (!videos) return (<main className="p-4"><p className="text-center">No Videos</p></main>);

    return (
    <div className="flex md:mx-4 md:my-6">
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-5 4xl:grid-cols-6">
        {videos.map((video : Video & { name: string }) => (
            <div key={video.id} className='md:mx-2 mb-6'>
              <Link href={`/watch?v=${video.video_id}`} >
                <Card title={video.title} author={video.name} thumbnailUrl={`${thumbnailUrl}/${video.thumbnail_id}`} />
              </Link>
            </div>
        ))}
    </div>
    </div>
    )
}