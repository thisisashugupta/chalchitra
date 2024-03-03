import React from 'react';
import { MoreVertical } from 'lucide-react';

const time = 2;
const views = 26;

interface CardProps {
    title: string;
    author: string;
    thumbnailUrl?: string;
}

export default function Card({title, author, thumbnailUrl}: CardProps) {

    return (
        
        <div className='flex flex-col gap-1'>
            <img className="w-full aspect-video md:rounded-xl" src={thumbnailUrl} />
            <div className='flex w-full justify-between pl-2'>
                <img className="mt-2 mr-3 w-9 h-9 rounded-full" src='https://picsum.photos/200' />
                
                <div className='flex flex-col w-full'>
                    <div className='mt-2 text-sm font-semibold line-clamp-2'>{title}</div>
                    <div className='mt-1 text-xs text-gray-500 space-x-1'>
                        <span>{author}</span>
                        <span>•</span>
                        <span>{`${views}`}K views</span>
                        <span>•</span>
                        <span>{`${time}`} weeks ago</span>
                    </div>
                </div>

                {/* 
                TODO: Options to current video, like 
                Add to queue
                Save to Watch Later
                Save to playlist
                Download
                Share
                Not interested
                Don't recommend channel
                Report
                 */}

                <div>
                    <div className='mt-2 ml-3 w-10 h-10 text-center p-2 rounded-full font-bold hover:bg-gray-300'><MoreVertical /></div>
                </div>
            </div>
        </div>
    )
}