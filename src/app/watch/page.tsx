'use server'

import { permanentRedirect } from 'next/navigation'
import VideoDetails from './VideoDetails'
import Suggestions from './Suggestions'
import { Suspense } from 'react'
import { VideoDetailsSkeleton, VideoPlayerSkeleton } from './loading'
import VideoPlayer from '@/app/watch/VideoPlayer'
// import dynamic from 'next/dynamic'

// const DynamicVideoPlayer = dynamic(
//     () => import('@/app/watch/VideoPlayer'),
//     {
//       loading: () => <VideoPlayerSkeleton />,
//     }
//   )

const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION

interface WatchPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function WatchPage({ searchParams }: WatchPageProps) {

    const v = searchParams.v;
    if (!v) permanentRedirect('/');

    const videoUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/videos/${v}`
    const thumbnailUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/thumbnails/${v}`

    return (
        <main className='flex justify-center'>
            <div className='max-w-[106.5rem] md:mx-6 flex flex-col lg:flex-row gap-6 items-start justify-center '>
                <div className='w-full'>
                    {/* <DynamicVideoPlayer videoUrl={videoUrl as string} thumbnailUrl={thumbnailUrl as string} /> */}
                    <VideoPlayer videoUrl={videoUrl as string} thumbnailUrl={thumbnailUrl as string} />
                    <Suspense fallback={<VideoDetailsSkeleton />}>
                        <VideoDetails v={v as string} />
                    </Suspense>
                </div>
                <Suggestions />
            </div>
        </main>
    )
}