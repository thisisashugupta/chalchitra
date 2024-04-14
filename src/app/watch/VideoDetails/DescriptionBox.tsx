"use client"

import React, { useState } from 'react';

import Views from '@/components/video-card/Views'
import UploadTime from '@/components/video-card/UploadTime'

import { VideoWithAuthor } from '@/types/video'
import { addCommas } from '@/lib/number'
import { formatDate } from '@/lib/time'

type DescriptionBoxProps =  {
    video: VideoWithAuthor
}

export default function DescriptionBox({video}: DescriptionBoxProps) {

    const [open, setOpen] = useState(false);

    return (
    <>
        {!open && <button
            className={`
                text-start mt-3 p-3 w-full rounded-xl bg-gray-100 dark:bg-gray-800/90 
                focus:bg-gray-300 dark:focus:bg-gray-600/70
            `} 
            onClick={() => setOpen(true)}
        >
            <div className="text-0.5xs font-semibold space-x-2">
                <Views views={video?.views || 0} />
                <UploadTime createdAt={video?.createdAt} />
            </div>
            <div className={`text-sm whitespace-pre-line line-clamp-2`}>
                <p>{video?.content}</p>
            </div>

            <p  className='text-sm font-semibold'>...more</p>
            
        </button>}

        {open && <div
            className={`
                text-start mt-3 p-3 w-full rounded-xl bg-gray-100 dark:bg-gray-800/90
            `} 
        >
            <div className="text-0.5xs font-semibold space-x-2">
                <span>{addCommas(video?.views!)} views</span>
                <span>{formatDate(video?.createdAt!)}</span>
            </div>
            <div className={`text-sm whitespace-pre-line`}>
                <p>{video?.content}</p>
            </div>
            <button onClick={() => setOpen((prev) => !prev)}>
                <p  className='text-sm font-semibold'>Show less</p>
            </button>
        </div>}
    </>
    );

}