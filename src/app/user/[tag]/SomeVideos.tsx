import React from 'react'
import VideoCardVertical from '@/components/ui/video-card-vertical'
import { CarouselItem } from "@/components/ui/carousel"
import CarouselWrapper from '@/components/ui/CarouselWrapper'
import { VideoWithAuthor } from '@/types/video'
import { type Video } from '@prisma/client' 
import { thumbnailUrl } from '@/lib/exports'

function SomeVideos({videos}: {videos: Partial<Video>[]}) {

  return (<div>
        <p className='text-xl font-bold py-2'>Some Videos</p>
        <CarouselWrapper>
            {videos.map((video, index) => (
                <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <VideoCardVertical 
                        video={video as unknown as VideoWithAuthor} 
                        thumbnailUrl={thumbnailUrl} 
                        hideAuthor 
                    />
                </CarouselItem>
            ))}
        </CarouselWrapper>
    </div>
  )
}

export default SomeVideos
