'use server';

// import { Suspense } from 'react'
// import SuggestionsSkeleton from '@/components/SuggestionsSkeleton'
import React from 'react';
import SuggestionsCard from './SuggestionsCard';
import { Video } from '@prisma/client';
import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();


const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION

type VideoDetailsProps = Video & {
    author: { name: string }
  }

const Suggestions = async () => {
    // const [videos, setVideos] = useState<Partial<Video>[]>([]);
    // const searchParams = useSearchParams();
    let videos:any[] = [];

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
        
        videos = response; // .map(({ id, title, video_id, author, thumbnail_id }) => ({ id, title, video_id, thumbnail_id, name: author.name }));
        console.log("videos", videos);
        
    } catch (error) {
        console.error(error);
    } finally {
        await cleanup();
    }

    const thumbnailDir = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/thumbnails`

    return (
        <>
            <div className='lg:max-w-sm space-y-4 mb-6 md:my-6 mx-3 md:mx-0'>
                <h2 className='text-xl font-semibold'>Suggestions</h2>
                {videos.map((video: VideoDetailsProps) => (
                <div key={video.id}>
                    <SuggestionsCard updatedAt={video.updatedAt.toString()} title={video?.title} author={video.author.name} thumbnailUrl={`${thumbnailDir}/${video.thumbnail_id}`} video_id={video.video_id} />
                </div>
                ))}
            </div>
        </>
    );
};

export default Suggestions;