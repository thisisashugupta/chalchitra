import React from 'react'
import Link from 'next/link'
import VideoCardVertical from '@/components/ui/video-card-vertical'
import { CarouselItem } from "@/components/ui/carousel"
import CarouselWrapper from '@/components/ui/CarouselWrapper'
import { VideoWithAuthor } from '@/types/video'
import { type Video } from '@prisma/client' 
import { thumbnailUrl } from '@/lib/exports'
import { Button } from '@/components/ui/button'
import ViewAllButton from '@/components/ui/buttons/ViewAllButton'

function VideoShowcase({title, videos, href='/'}: {title: string, videos: Partial<Video>[], href?: string}) {

  return (<div>

        <div className='flex justify-between'>
            <p className='text-xl font-bold py-2'>{title}</p>
            <p></p>
            <Link href={href}><ViewAllButton/></Link>
        </div>
        
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

export default VideoShowcase
