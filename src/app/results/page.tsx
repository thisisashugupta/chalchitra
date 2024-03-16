'use server';

import React from 'react';
import ResultCard from '@/components/ResultCard';
import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();

const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION

type VideoDetailsProps = 
{
    id: number;
    title: string;
    video_id: string;
    name: string;
    thumbnail_id: string;
}

const VideoList = async ({searchParams}:any) => {
    const searchQuery = searchParams['search_query'];

    let videos:any[] = [];

    try {
        const response = await prisma.video.findMany({
            where: {
                title: {
                    contains: `${searchQuery?.toLowerCase()}`,
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
        
        videos = response.map(({ id, title, video_id, author, thumbnail_id }) => ({ id, title, video_id, thumbnail_id, name: author.name }));
        // console.log("videos", videos);
        
    } catch (error) {
        console.error(error);
    } finally {
        await cleanup();
    }

    const thumbnailDir = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/thumbnails`

    return (
        <main className='mx-8 pb-4'>
        <div className='max-w-6xl mx-auto'>
            { videos.length>0 ? 
                <>
                <h2 className='py-3 text-2xl font-semibold'>Results</h2>
                    <div className='space-y-4'>
                        {videos.map((video: VideoDetailsProps) => (
                        <div key={video.id}>
                            <ResultCard title={video?.title} author={video.name} thumbnailUrl={`${thumbnailDir}/${video.thumbnail_id}`} video_id={video.video_id} />
                        </div>
                        ))}
                    </div>
                </> 
                : 
                <p>No videos found.</p>
            }
        </div>
        </main>
    );
};

export default VideoList;