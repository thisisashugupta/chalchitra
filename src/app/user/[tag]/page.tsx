/* /user/[tag] */
"use server"

import React from 'react'
import { getPrismaClient } from '@/app/providers/PrismaProvider'
import Channel from './Channel'

async function page({params}:{params: {tag: string}}) {
    
    const tag = params.tag;
    
    const prisma = getPrismaClient();

    const channelData = await prisma.user.findUnique({
        where: {
            tag
        },
        include: {
            videos: {
                take: 10,
                select: {
                    id: true,
                    title: true,
                    views: true,
                    thumbnail_id: true,
                },
            }
        }
    });

    console.log(channelData);
    
  return (<Channel channelData={channelData} />)
}

export default page