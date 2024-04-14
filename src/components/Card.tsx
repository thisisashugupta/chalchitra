import Link from 'next/link';
import Thumbnail from '@/components/ui/Thumbnail';
import { MoreVertical } from 'lucide-react';
import { type Video, type User } from '@prisma/client';
import Views from '@/components/video-card/Views';
import UploadTime from '@/components/video-card/UploadTime';

type CardProps = {
    video: Partial<Video> & { author: Partial<User> },
    thumbnailUrl: string
}

export default function Card({video, thumbnailUrl}: CardProps) {

    return (
        <div className='md:mx-2 mb-6 flex flex-col gap-1'>
        <Link href={`/watch?v=${video?.video_id}`} >

            <Thumbnail thumbnailUrl={`${thumbnailUrl}/${video?.thumbnail_id}`} />

            <div className='flex w-full justify-between pl-2'>

                {/* Channel PFP */}
                <img 
                    src={ video?.author?.photo || 'https://picsum.photos/200'} 
                    className="mt-2 mr-3 w-9 h-9 rounded-full" 
                />
                
                <div className='flex flex-col w-full'>
                    {/* Video Title */}
                    <div className='mt-2 text-sm font-semibold line-clamp-2'>{video?.title}</div>
                        
                    {/* Video Metadata */}
                    <div className='mt-1 text-xs text-gray-500 space-x-1'>
                        <span>{video?.author?.name}</span>
                        <span>•</span>
                        <Views views={video?.views || "0"} />
                        {/* TODO: add views in prisma data model */}
                        <span>•</span>
                        <UploadTime createdAt={video?.createdAt} />
                    </div>
                </div>

                {/* 
                TODO: Add Options to current video, like 
                Add to queue
                Save to Watch Later
                Save to playlist
                Download
                Share
                Not interested
                Don't recommend channel
                Report
                 */}
                <Link href={`/`}>
                <div className='mt-2 ml-3 w-10 h-10 text-center p-2 rounded-full font-bold hover:bg-gray-300'>
                    <MoreVertical />
                </div>
                </Link>

            </div>
        </Link>
        </div>
    )
}