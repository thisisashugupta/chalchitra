"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Video }  from '@prisma/client'
import Card from '@/components/Card'

export default function FeedClient() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {

    const fetchVideos = async () => {
      try {
        
        const response = await fetch("/api", {
          method: "POST",
        });
        const body = await response.json();
        setVideos(body.videos);
        setIsError(false);
        
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVideos();

  }, [])

  if(isError) return (<main className="p-4"><p className="text-center">Error loading videos</p></main>)

  return (
    <div className="flex">
    {isLoading ? <p className="text-center">Loading...</p> : <>
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
    {/* <div className="w-full flex flex-wrap"> */}
        {videos.map((video : Video & { name: string }) => (
            <div key={video.id} className='md:mx-2 mb-6'>
              <Link href={`/watch?v=${video.video_id}`} >
                <Card title={video.title} author={video.name} thumbnailUrl={"kuch nahi hai yaha. ye component kahi use hi nahi ho raha."} />
              </Link>
            </div>
        ))}
        </div>
    </>}
    </div>
  )
}