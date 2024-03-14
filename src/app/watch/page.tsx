'use server'

import { permanentRedirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import VideoPlayer from '@/app/watch/VideoPlayer'
import { VideoDetailsSkeleton, SuggestionsSkeleton } from './loading'

const DynamicSuggestions = dynamic(
    () => import('@/app/watch/Suggestions'), 
    { loading: () => <SuggestionsSkeleton /> }
)

const DynamicVideoDetails = dynamic(
    () => import('@/app/watch/VideoDetails'),
    { loading: () => <VideoDetailsSkeleton /> }
)

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
            <div className='w-full max-w-[106.5rem] md:mx-6 flex flex-col lg:flex-row gap-6 items-start justify-center'>
                <div className='w-full'>
                    <VideoPlayer videoUrl={videoUrl as string} thumbnailUrl={thumbnailUrl as string} />
                    <DynamicVideoDetails v={v as string} />
                </div>
                <DynamicSuggestions />
            </div>
        </main>
    )
}