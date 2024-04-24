'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MoreVertical } from 'lucide-react'
import { thumbnailUrl } from '@/lib/url'
import Thumbnail from '@/components/ui/Thumbnail'
import VideoMetadata from '@/components/video-card/VideoMetadata'
import { videoState } from '@/app/providers/RecoilProvider'
import { useSetRecoilState } from 'recoil'
import { VideoWithAuthor } from '@/types/video'

interface SuggestionsCardProps {
    video: VideoWithAuthor
}

export default function SuggestionsCard({video}: SuggestionsCardProps) {
    const setVideoState = useSetRecoilState(videoState)
    const router = useRouter()

    function setVideo() {
        setVideoState(video?.video_id!)
        router.push(`/watch/?v=${video?.video_id}`)
    }

    return (
        <div className='flex gap-2'>

            <button onClick={setVideo} className='w-full aspect-video min-w-[160px] max-w-[160px] select-none'>
                <Thumbnail thumbnailUrl={`${thumbnailUrl}/${video?.video_id}`} rounded='lg' />
            </button>

            <div className='flex flex-col justify-start w-full'>
                <button onClick={setVideo} className='text-left'>
                    <div className='flex justify-between space-x-2 text-md font-medium'>
                        {/* Video Title */}
                        <div className="line-clamp-2">{video?.title}</div>
                        <div className="min-w-10 h-6">
                            <div className='hidden lg:block w-6 h-6 text-center pt-[2px] font-bold hover:bg-gray-200 rounded-full'><MoreVertical className='mx-auto' strokeWidth={1} size={20} /></div>
                        </div>
                    </div>
                    {/* Author Name */}
                    <div><p className='text-xs text-gray-400'>{video?.author?.name}</p></div>
                    <VideoMetadata className='mt-0' video={video} hideAuthor />
                </button>
            </div>

        </div>
    );

}