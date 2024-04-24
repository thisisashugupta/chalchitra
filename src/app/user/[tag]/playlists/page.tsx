// user/[tag]/videos
"use server"

import React from 'react'
import { getPrismaClient } from '@/app/providers/PrismaProvider'
import Channel from '../Channel'
import DisplayFlex from '@/components/ui/display-in-grid'
import { Heading } from '@/components/ui/heading'
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
            playlists: {
                take: 10,
                select: {
                    id: true,
                    title: true,
                    updatedAt: true,
                    // views: true,
                    // thumbnail_id: true,
                },
            }
        }
    })

    if(!channel) throw new Error('Error fetching Channel Data')
    
  return (<div className='pt-4 px-8'>
    <Channel channelData={channel} />

    {(channel?.playlists.length === 0) 
        ? 
        <Heading>No Playlists</Heading>
        :
        <DisplayFlex>
        {channel!.playlists.map((video: any) => (
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