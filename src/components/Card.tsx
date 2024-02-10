import React from 'react';
import Link from 'next/link';

const time = 2;
const views = 26;

interface CardProps {
    title: string;
    author: string;
}

export default function Card({title, author}: CardProps) {

    return (
        
        <div className='flex flex-col'>
            <img className="w-full aspect-video rounded-xl" src='https://picsum.photos/200' />
            <div className='flex w-full justify-between'>
                <img className="mt-3 mr-3 w-10 h-10 rounded-full" src='https://picsum.photos/200' />
                
                <div className='flex flex-col w-full'>
                    <div className='mt-3 font-bold text-lg'>{title}</div>
                    <div className='mt-1 text-sm text-gray-500'>{author}</div>
                    <div className='text-sm text-gray-500'>{`${views}`}K views • {`${time}`} weeks ago</div>
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

                <Link href='/watch?v=b4ddd647aac91217f9cc4d20ff3255bb'>
                <div className='mt-3 ml-3 hover:bg-gray-300 rounded-full'>
                    <div className=" w-10 h-10 text-center p-2 font-bold"><p>︙</p></div>
                </div>
                </Link>
            </div>
        </div>
    )
}