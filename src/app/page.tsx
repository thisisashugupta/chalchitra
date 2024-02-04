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

  })

  return (
    <main className="p-4">
      <div className="font-mono text-sm sm:flex">
        {isLoading ? <p className="text-center">Loading...</p> : <>
          <div className="w-full flex flex-col sm:flex-row sm:flex-wrap items-center">
            {videos.map((video : Video & { name: string }) => (
              <div key={video.id}>
                <Link href={`/watch?v=${video.video_id}`} className="w-full sm:w-1/3 p-2">
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