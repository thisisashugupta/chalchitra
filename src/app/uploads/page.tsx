"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Video } from '@prisma/client'
import { Button } from "@/components/ui/button"
import VideoCard from "@/components/VideoCard"
import Link from 'next/link'

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
        <main className="p-2 bg-white">
            <div className='flex justify-between mx-2'>
                <h1>My Uploads</h1>
                <Button onClick={() => setRefresh((prevVal) => !prevVal)}>Refresh</Button>
            </div>

            <div className="flex">
                {isLoading ? <p className="text-center">Loading...</p> : <>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
                {/* <div className="w-full flex flex-wrap"> */}
                    {videos.map((video : Video & { name: string }) => (
                        <div key={video.id} className='mx-2 mb-6'>
                          {/* <Link href={`/watch?v=${video.video_id}`}> */}
                          <VideoCard title={video.title} video_id={video.video_id} setRefresh={setRefresh}/>
                          {/* </Link> */}
                        </div>
                    ))}
                    </div>
                </>}
            </div>

        </main>
    )
}