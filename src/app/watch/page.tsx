import { Suspense } from 'react'
import { permanentRedirect } from 'next/navigation'
import VideoPlayer from '@/app/watch/VideoPlaier/VideoPlayer' // client component
import VideoDetails from '@/app/watch/VideoDetails/VideoDetails' // server component
import Suggestions from '@/app/watch/Suggestions/Suggestions' // server component
import { VideoDetailsSkeleton, SuggestionsSkeleton } from './loading'

interface WatchPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ searchParams }: WatchPageProps) {
    const v = searchParams.v;
    if (!v) permanentRedirect('/');

    return (
        <main className='flex justify-center'>
            <div className='w-full max-w-[106.5rem] md:mx-6 flex flex-col lg:flex-row gap-6 items-start justify-center'>
                <div className='w-full mb-6'>
                    <VideoPlayer video_id={v as string}>
                    <Suspense fallback={<VideoDetailsSkeleton/>}>
                        <VideoDetails v={v as string} />
                    </Suspense>
                    </VideoPlayer>
                </div>
                <Suspense fallback={<SuggestionsSkeleton/>}>
                    <Suggestions />
                </Suspense>
            </div>
        </main>
    )
}