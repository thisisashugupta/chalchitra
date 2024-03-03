import React from 'react';
import { MoreVertical } from "lucide-react";
import Link from 'next/link';
import { getElapsedTime, formatDate } from '@/lib/functions'

const views = 33;

interface SuggestionsCardProps {
    title: string;
    author: string;
    thumbnailUrl?: string;
    video_id: string;
    updatedAt: string;
}

export default function SuggestionsCard({title, author, thumbnailUrl, video_id, updatedAt}: SuggestionsCardProps) {

    return (
        <div className='flex gap-4'>

            <div className='w-full min-w-[160px] max-w-[160px]'>
                <Link href={`/watch/?v=${video_id}`}>
                    <img className="aspect-video rounded-xl" src={thumbnailUrl} />
                </Link>
            </div>

            <Link className='w-full' href={`/watch/?v=${video_id}`} passHref legacyBehavior >
                <div className='w-full flex flex-col cursor-pointer'>
                    <div className='flex justify-between space-x-2 text-md font-medium'>
                        <div className="line-clamp-2">{title}</div>
                        <div className="min-w-10 h-6">
                            <div className='hidden lg:block w-6 h-6 text-center pt-[2px] font-bold hover:bg-gray-200 rounded-full'><MoreVertical className='mx-auto' strokeWidth={1} size={20} /></div>
                        </div>
                    </div>
                    <Link className='text-xs text-gray-500 hover:text-black' href={`/user/${author}`}>{author}</Link>
                    <div className='text-xs text-gray-500'>
                        <span>{`${views}`} views</span><span> • {getElapsedTime(updatedAt)}</span>
                    </div>
                </div>
            </Link>
        </div>
    );

}