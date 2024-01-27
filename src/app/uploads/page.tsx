"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Video } from '@prisma/client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

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
                console.log(data.data);
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
        <Button onClick={() => setRefresh(!refresh)}>Refresh</Button>
        { isLoading ? 
            <p>Loading...</p> : 
            <ul>
                {videos.map((video : Video) => (
                    <li key={video.id}>
                        <h3 className='font-black'>{video.title}</h3>
                        <Link href={`/video/${video.video_id}`}>Click Here</Link>
                        <p>{video.content}</p>
                    </li>
                ))}
            </ul> 
        }
        </div>
    )
}