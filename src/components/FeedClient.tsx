"use client"

import { useState, useCallback } from 'react'

import VideoCard from '@/components/ui/FeedVideoCard'
import { type VideoWithAuthor } from '@/types/video'
import { thumbnailUrl } from '@/lib/url'

import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import DisplayInGrid from '@/components/ui/display-in-grid'
import FeedSkeleton from '@/components/ui/skeletons/FeedSkeleton'
import Spinner from '@/components/ui/spinner'

export default function FeedClient({videos: initialVideos, isError} : {videos: VideoWithAuthor[], isError: boolean}) {

    console.log('rendered')
    
    const [videos, setVideos] = useState<VideoWithAuthor[]>(initialVideos)
    const [hasNextPage, setHasNextPage] = useState(true)

    const fetchVideos = useCallback(async (skip=5, limit=5) => {
        const response = await fetch(`/api/feed?skip=${skip}&limit=${limit}`)
        const data = await response.json()
        console.log(data.videos)
        if (data.total < limit) setHasNextPage(false)
        return data.videos
    }, [setHasNextPage])

    // using intersection observer custom hook
    const lastVideoRef = useIntersectionObserver<HTMLDivElement>(() => {
        void fetchVideos(videos.length).then(newVideos => 
            setVideos((prev) => [...prev, ...newVideos])
        )
    }, [hasNextPage])

    return (
        <div className='md:mx-4 md:my-6'>
            <DisplayInGrid>
                {videos.map((video : VideoWithAuthor, i, videos) => (
                    <div key={Math.random()} ref={videos.length -1 === i ? lastVideoRef : null}>
                        <VideoCard video={video} thumbnailUrl={thumbnailUrl} />
                    </div>
                ))}
                
            </DisplayInGrid>
            {
            hasNextPage && 
            <div>
                <FeedSkeleton />
                <Spinner className='w-8 h-8' />

            </div>
            }
        </div>
    )
}
