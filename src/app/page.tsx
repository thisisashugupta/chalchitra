"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Video }  from '@prisma/client'
import Card from '@/components/ui/Card'

export default function Home() {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {

    const fetchVideos = async () => {
      try {
        
        const response = await fetch("/api", {
          method: "POST",
        });
        const body = await response.json();
        setVideos(body.videos);
        
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVideos();

  }, [])


  return (
    <main className="flex flex-col items-center justify-between p-4">
      <div className="w-full items-center justify-between font-mono text-sm lg:flex">
        {isLoading ? <p>Loading...</p> : <>
          <div className='flex flex-wrap'>
            {videos.map((video : Video & { name: string }) => (
              <div key={video.id}>
                <Link href={`/watch?v=${video.video_id}`} >
                  <Card title={video.title} author={video.name} />
                </Link>
              </div>
            ))}
          </div>
        </>}
      </div>
    </main>
  )
}