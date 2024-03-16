'use client'

import { Suspense } from 'react'
// import { permanentRedirect } from 'next/navigation'
import RecoilProvider from '@/app/providers/RecoilProvider'
import VideoPlayer from '@/app/watch/VideoPlayer'
// import VideoDetails from '@/app/watch/VideoDetails'
// import Suggestions from '@/app/watch/Suggestions'
// import { VideoDetailsSkeleton, SuggestionsSkeleton } from './loading'

interface WatchPageProps {
    children: React.ReactNode
}

export default function WatchPage({ children }: WatchPageProps) {
    // if (!v) permanentRedirect('/');


    

    return (
        <RecoilProvider>
                    {/* key={videoUrl}  */}
                    <Suspense fallback={<>Loading Video Player...</>}>
                        <VideoPlayer />
                        {/* videoUrl={videoUrl as string} thumbnailUrl={thumbnailUrl as string} */}
                    </Suspense>
                    {children}
            
        </RecoilProvider>
    )
}