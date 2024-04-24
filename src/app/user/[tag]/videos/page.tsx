// user/[tag]/videos
"use server"

import React from 'react'
import { getPrismaClient } from '@/app/providers/PrismaProvider'
import Channel from '../Channel'
import { Heading } from '@/components/ui/heading'
import DisplayFlex from '@/components/ui/display-in-grid'
import VideoCardVertical from '@/components/ui/video-card-vertical'
import { thumbnailUrl } from '@/lib/exports'

async function Page({params}:{params: {tag: string}}) {
    
    const tag = params.tag;
    
    const prisma = getPrismaClient();

    const channel = await prisma.user.findUnique({
        where: {
            tag
        },
        include: {
            videos: {
                // take: 10,
                select: {
                    id: true,
                    title: true,
                    views: true,
                    thumbnail_id: true,
                    createdAt: true,
                },
            }
        }
    });

    const author = {
        photo: channel?.photo,
        name: channel?.name,
        tag: channel?.tag,
    }

    if(!channel) throw new Error('Error fetching Channel Data')
    
  return (<div className='pt-4 px-8'>
  <Channel channelData={channel} />

  {(channel?.videos.length === 0) 
      ? 
      <Heading>No Videos</Heading>
      :
      <DisplayFlex>
      {channel!.videos.map((video: any) => (
      <div key={video.id}>
          {/* TODO: add separate playlist card component, refactor card components to make them ui components */}
          <VideoCardVertical video={video} thumbnailUrl={thumbnailUrl} hideAuthor />
      </div>
      ))}
      </DisplayFlex>
  }
</div>)
}

export default Page