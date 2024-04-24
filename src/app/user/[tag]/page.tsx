/* /user/[tag] */
"use server"

import React from 'react'
import { getPrismaClient } from '@/app/providers/PrismaProvider'
import Channel from './Channel'
import SomeVideos from './SomeVideos'

async function Page({params}:{params: {tag: string}}) {
    
    const tag = params.tag;
    
    const prisma = getPrismaClient();

    const channelData = await prisma.user.findUnique({
        where: {
            tag
        },
        include: {
            videos: {
                take: 6,
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

    if (!channelData) throw new Error('Error Fetching Channel Data')        
    
  return (<div className='pt-4 px-8'>
    <Channel channelData={channelData} />
    <SomeVideos videos={channelData?.videos!} />
  </div>)
}

export default Page