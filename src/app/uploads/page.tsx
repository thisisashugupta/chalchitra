"use client"
/* /uploads */
// TODO: convert into server component, maybe make the card component as client component
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { VideoWithAuthor } from '@/types/video'
import { Button } from "@/components/ui/button"
import VideoCard from "@/components/cards/UploadsVideoCard"
import UploadsSkeleton from '@/components/ui/skeletons/UploadsSkeleton'

export default function Uploads() {

    const searchParams = useSearchParams()
    const limit = parseInt(searchParams.get('limit')!) || 10
    const offset = parseInt(searchParams.get('offset')!) || 0

    const [isLoading, setIsLoading] = useState(true)
    const [videos, setVideos] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {

        async function getVideos() {
            try {
                const response = await fetch(`/api/videos?limit=${limit}&offset=${offset}`, {
                    method: 'GET'
                })
                const data = await response.json()
                setVideos(data.data);
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        getVideos()

    }, [limit, offset, refresh])

    return (
        <>
            <div className='flex justify-between md:mx-6 md:my-4'>
                <p>My Uploads</p>
                <Button onClick={() => setRefresh((prevVal) => !prevVal)}>Refresh</Button>
            </div>

            { isLoading ? <UploadsSkeleton /> : 
            <div className={`md:mx-4 md:my-8
                grid grid-cols-1 
                md:grid-cols-2 
                lg:grid-cols-3 
                xl:grid-cols-4 
                2xl:grid-cols-5 
                3xl:grid-cols-6
            `}>
                {videos.map((video : VideoWithAuthor) => (
                    <div key={video.id}>
                        <VideoCard video={video} setRefresh={setRefresh}/>
                    </div>
                ))}
            </div>
            }

        </>
    )
}