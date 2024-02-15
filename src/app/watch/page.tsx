'use server'

import { permanentRedirect } from 'next/navigation'
import VideoDetails from './VideoDetails'
import VideoPlayer from './VideoPlayer'
import { Suspense } from 'react'
import { VideoDetailsSkeleton, VideoPlayerSkeleton } from './loading'

interface WatchPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function WatchPage({ searchParams }: WatchPageProps) {

    const v = searchParams.v;
    if (!v) permanentRedirect('/');

    return (
        <main className='flex flex-col items-center justify-center'>
        <div className='w-full max-w-7xl'>
            <Suspense fallback={<VideoPlayerSkeleton />}>
                <VideoPlayer v={v as string} />
            </Suspense>
            <Suspense fallback={<VideoDetailsSkeleton />}>
                <VideoDetails v={v as string} />
            </Suspense>
        </div>
        </main>
    )
}