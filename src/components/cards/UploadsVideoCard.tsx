import React from 'react';
import Link from 'next/link';

import Options from '@/components/cards/options/UploadsVideoCardOptions';
import Thumbnail from '@/components/ui/Thumbnail';
import VideoMetadata from '@/components/video-card/VideoMetadata';

import { VideoWithAuthor } from '@/types/video';
import { thumbnailUrl } from '@/lib/url';

interface VideoCardProps {
    video: VideoWithAuthor;
    thumbnailUrl?: string;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

async function UploadsVideoCard({video, setRefresh}: VideoCardProps) {

    return (
        <div className='mx-2 mb-6 flex flex-col gap-1'>
            <Link href={`/watch?v=${video?.video_id}`} >

            <Thumbnail thumbnailUrl={`${thumbnailUrl}/${video?.thumbnail_id}`} />

            <div className='flex w-full justify-between pl-2'>

                <div className='flex flex-col w-full'>
                    {/* Video Title */}
                    <div className='mt-2 text-sm font-semibold line-clamp-2'>{video?.title}</div>
                        
                    <VideoMetadata video={video} hideAuthor />
                </div>

                <div className='mt-2 ml-3 p-2 w-10 h-10 text-center rounded-full font-bold hover:bg-gray-300'>
                    <Options video_id={video?.video_id!} setRefresh={setRefresh} />
                </div>

            </div>
            </Link>
        </div>
    )

}

export default UploadsVideoCard;