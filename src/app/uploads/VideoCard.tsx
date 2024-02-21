import React from 'react';
import Link from 'next/link';
import Dropdown from '@/app/uploads/Dropdown';

interface VideoCardProps {
    title: string;
    video_id: string;
    thumbnailUrl: string;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const time = 2;
const views = 26;

export default function VideoCard({title, video_id, thumbnailUrl, setRefresh}: VideoCardProps) {

    return (
        <div className="flex flex-col">
            <Link href={`/watch?v=${video_id}`}><img className="w-full aspect-video rounded-xl" src={thumbnailUrl} /></Link>
            <div className='flex w-full justify-between'>

                {/* <img className="mt-3 mr-3 w-10 h-10 rounded-full" src='https://picsum.photos/200' /> */}

                <div className='flex flex-col w-full'>
                    <div className='mt-3 font-bold text-lg'>{title}</div>
                    <div className='text-sm text-gray-500'>{`${views}`}K views • {`${time}`} weeks ago</div>
                </div>

                <div>
                    <div className='mt-3 ml-3 w-10 h-10 text-center p-2 rounded-full hover:bg-gray-300'>
                        <Dropdown video_id={video_id} setRefresh={setRefresh} />
                    </div>
                </div>
            </div>
        </div>
    )

}