'use server'

import { permanentRedirect } from 'next/navigation'
import VideoDetails from './VideoDetails'
import VideoPlayer from './VideoPlayer'
import { Suspense } from 'react'

interface WatchPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function WatchPage({ searchParams }: WatchPageProps) {

    const v = searchParams.v;
    console.log(`v is ${v as string}`);
    
    if (!v) permanentRedirect('/');

    return (
        <main className='flex flex-col items-center justify-center'>
        <div className='w-full max-w-7xl'>
            <Suspense fallback={<div>Loading...</div>}>
                <VideoPlayer v={v as string} />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <VideoDetails />
            </Suspense>
        </div>
        </main>
    )
}