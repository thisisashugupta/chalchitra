'use client'

import RecoilProvider from '@/app/providers/RecoilProvider'

interface WatchPageProps {
    children: React.ReactNode
}

export default function WatchPage({ children }: WatchPageProps) {

    return (
        <RecoilProvider>
            {children}
        </RecoilProvider>
    )
}