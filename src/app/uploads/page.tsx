"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Video } from '@prisma/client'
import { Button } from "@/components/ui/button"
import VideoCard from "@/app/uploads/VideoCard"
import UploadsSkeleton from './UploadsSkeleton'

const BUCKET_NAME = process.env.NEXT_PUBLIC_BUCKET_NAME
const BUCKET_REGION = process.env.NEXT_PUBLIC_BUCKET_REGION
const thumbnailUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/thumbnails`

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
            <div className='flex justify-between mx-2 my-4'>
                <p>My Uploads</p>
                <Button onClick={() => setRefresh((prevVal) => !prevVal)}>Refresh</Button>
            </div>    
            <div className="flex">
                { isLoading ? <UploadsSkeleton /> : 
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                    {videos.map((video : Video & { name: string }) => (
                        <div key={video.id} className='mx-2 mb-6'>
                          <VideoCard title={video.title} video_id={video.video_id} thumbnailUrl={`${thumbnailUrl}/${video.thumbnail_id}`} setRefresh={setRefresh}/>
                        </div>
                    ))}
                </div>
                }
            </div>
        </>
    )
}