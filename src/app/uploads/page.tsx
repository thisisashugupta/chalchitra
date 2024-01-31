"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Video } from '@prisma/client'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import VideoCard from "@/components/ui/VideoCard"

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
        <Button onClick={() => setRefresh(!refresh)}>Refresh</Button>
        { isLoading ? 
            <p>Loading...</p> : 
            <ul>
                {videos.map((video : Video) => (
                    <li key={video.id}>                        
                        <VideoCard title={video.title} author={video.content!} video_id={video.video_id} />
                    </li>
                ))}
            </ul> 
        }
        </div>
    )
}

/*

<AlertDialog>
    <AlertDialogTrigger className='bg-red-500 px-3 py-2 rounded'>Delete</AlertDialogTrigger>
    <AlertDialogContent>
    <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
        This action cannot be undone. It will permanently delete this video and remove the data from our servers.
        </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
    </AlertDialogContent>
</AlertDialog>


*/