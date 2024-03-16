// 'use server'

import { Suspense } from 'react'
import { permanentRedirect } from 'next/navigation'
import WatchPage from '@/app/watch/WatchPage'
// import VideoPlayer from '@/app/watch/VideoPlayer'
import VideoDetails from '@/app/watch/VideoDetails'
import Suggestions from '@/app/watch/Suggestions'
import { VideoDetailsSkeleton, SuggestionsSkeleton } from './loading'

// const BUCKET_NAME = process.env.BUCKET_NAME
// const BUCKET_REGION = process.env.BUCKET_REGION

interface WatchPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ searchParams }: WatchPageProps) {

    const v = searchParams.v;
    if (!v) permanentRedirect('/');

    // const videoUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/videos/${v}`

    return (
        <main className='flex justify-center'>
            <div className='w-full max-w-[106.5rem] md:mx-6 flex flex-col lg:flex-row gap-6 items-start justify-center'>
            <WatchPage>
                <Suspense fallback={<VideoDetailsSkeleton/>}>
                    <VideoDetails v={v as string} />
                </Suspense>
            <Suspense fallback={<SuggestionsSkeleton/>}>
                <Suggestions />
            </Suspense>
            </WatchPage>

        </div>
        </main>
    )
}