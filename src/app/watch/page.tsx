// 'use server'

import { Suspense } from 'react'
import { permanentRedirect } from 'next/navigation'
import WatchPage from '@/app/watch/WatchPage'
import VideoDetails from '@/app/watch/VideoDetails'
import Suggestions from '@/app/watch/Suggestions'
import { VideoDetailsSkeleton, SuggestionsSkeleton } from './loading'

interface WatchPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ searchParams }: WatchPageProps) {
    const v = searchParams.v;
    if (!v) permanentRedirect('/');

    return (
        <main className='flex justify-center'>
            <div className='w-full max-w-[106.5rem] md:mx-6 flex flex-col gap-6 items-start justify-center'>
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