"use client"

import { useState, useCallback } from 'react'
import CardSkeleton from "@/components/ui/skeletons/CardSkeleton"
import VideoCard from '@/components/ui/FeedVideoCard'
import { type VideoWithAuthor } from '@/types/video'
import { thumbnailUrl } from '@/lib/url'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import DisplayInGrid from '@/components/ui/display-in-grid'

export default function FeedClient({videos: initialVideos, isError} : {videos: VideoWithAuthor[], isError?: boolean}) {
    
    const [videos, setVideos] = useState<VideoWithAuthor[]>(initialVideos)
    const [hasNextPage, setHasNextPage] = useState(true)

    const fetchVideos = useCallback(async (skip=5, limit=5) => {
        if (initialVideos.length < limit) {
            setHasNextPage(false)
            return [];
        }
        const response = await fetch(`/api/feed?skip=${skip}&limit=${limit}`)
        const data = await response.json()
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
                {/* loading skeletons */}
                {hasNextPage && [1,2,3,4,5]
                    .map((i) => { return {id: i, title: "title", name: "name" }})
                    .map((video) => <div key={video.id} className='md:mx-2 mb-6'>
                        <CardSkeleton />
                    </div>)
                }
            </DisplayInGrid>
        </div>
    )
}
