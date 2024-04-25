import Link from 'next/link'
import Thumbnail from '@/components/ui/FeedThumbnail'
import { MoreVertical } from 'lucide-react'
import { VideoWithAuthor } from '@/types/video'
import VideoMetadata from '@/components/video-card/VideoMetadata'

type CardProps = {
    video: VideoWithAuthor
    thumbnailUrl: string
}

export default function Card({video, thumbnailUrl}: CardProps) {

    return (
        <Link href={`/watch?v=${video?.video_id}`} >
        <div className='md:mx-2 mb-6 flex flex-col gap-1'>

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
                    
                    <VideoMetadata video={video} />
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

                <div className='mt-2 ml-3 p-2 w-10 h-10 text-center rounded-full font-bold hover:bg-gray-300'>
                    <MoreVertical />
                </div>

            </div>
        </div>
        </Link>
    )
}