'use server';

// import { Suspense } from 'react'
// import SuggestionsSkeleton from '@/components/SuggestionsSkeleton'
import React from 'react';
import SuggestionsCard from './SuggestionsCard';

import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();

import { VideoWithAuthor } from '@/types/video';

const Suggestions = async () => {
    let videos: VideoWithAuthor[] = [];

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
        videos = response;
    } catch (error) {
        console.error(error);
    } finally {
        await cleanup();
    }

    return (
        <>
            <div className='lg:min-w-[25rem] lg:max-w-[25rem] space-y-2 mb-6 md:my-6 mx-3 md:mx-0'>
                <h2 className='text-xl font-semibold'>Suggestions</h2>
                {videos.map((video: VideoWithAuthor) => (
                <div key={video.id}>
                    <SuggestionsCard video={video} />
                </div>
                ))}
            </div>
        </>
    );
};

export default Suggestions