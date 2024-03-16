'use client'
import RecoilProvider from '@/app/providers/RecoilProvider'
import VideoPlayer from '@/app/watch/VideoPlayer'

interface WatchPageProps {
    children: React.ReactNode
}

export default function WatchPage({ children }: WatchPageProps) {

    return (
        <RecoilProvider>
            <VideoPlayer/>
            {children}
        </RecoilProvider>
    )
}