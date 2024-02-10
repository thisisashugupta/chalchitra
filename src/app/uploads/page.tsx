"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Video } from '@prisma/client'
import { Button } from "@/components/ui/button"
import VideoCard from "@/components/VideoCard"

export default function UploadsPage() {

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
        <div>
        <h1>My Uploads</h1>
        <Button onClick={() => setRefresh((prevVal) => !prevVal)}>Refresh</Button>
        { isLoading ? 
            <p>Loading...</p> : 
            <ul>
                {videos.map((video : Video) => (
                    <li key={video.id}>                        
                        <VideoCard title={video.title} author={video.content!} video_id={video.video_id} setRefresh={setRefresh}/>
                    </li>
                ))}
            </ul> 
        }
        </div>
    )
}