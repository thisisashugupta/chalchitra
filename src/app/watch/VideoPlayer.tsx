'use client'
import React, { useMemo, useRef, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { VideoPlayerSkeleton } from './loading'
import { Suspense } from 'react'
import { videoState } from '@/app/providers/RecoilProvider'

import VideoPlayerTemplate from '@/app/watch/VideoPlayerTemplate'
console.log('VideoPlayer page');

const BUCKET_NAME = process.env.NEXT_PUBLIC_BUCKET_NAME
const BUCKET_REGION = process.env.NEXT_PUBLIC_BUCKET_REGION

interface VideoPlayerProps {
    children: React.ReactNode,
    video_id?: string
}

export default function VideoPlayer({children, video_id}: VideoPlayerProps) {
    console.log('VideoPlayer Component')
    const v = useRecoilValue(videoState)
    console.log('video_id before v', video_id)
    console.log('v', v)
    video_id = v || video_id
    console.log('video_id after v', video_id)

    const videoUrl = useMemo(() => `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/videos/${video_id}`, [video_id])
    const videoRef: React.RefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null);
    const [mounted, setMounted] = useState(false)
    const [videoError, setVideoError] = useState(false)

    useEffect(() => {
        setMounted(true)
        console.log('mounted')
        return function() {
            setMounted(false)
            console.log('unmounted')
        }
    }, [])
    
    const playVideo = async () => await videoRef.current?.play()
    
    const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        console.error("error", e);
        setVideoError(true);
    }

    return (<>
        <Suspense fallback={<VideoPlayerSkeleton/>}>
        {!mounted && <VideoPlayerTemplate className="md:mt-6" text='Video Loading...' />}
        {mounted && <div className='bg-transparent w-full flex flex-col items-center justify-center md:mt-6 overflow-hidden'>
            {videoError && <VideoPlayerTemplate text='Video failed to load.' />}
            {!videoError &&
            <video 
                key={v}
                className="md:rounded-xl max-h-[75vh]"
                // autoPlay={mounted}
                controls 
                // loop
                playsInline // for iOS
                // poster={thumbnailUrl}
                preload="auto"
                ref={videoRef}
                onLoadStart={() => console.log("video load start")}
                onLoadedData={() => {
                    playVideo()
                    console.log("video loaded data")
                }}
                onCanPlay={() => console.log("video can play")}
                onPlay={() => console.log("play video")}
                onError={handleError}
            >
                <source 
                    src={videoUrl}
                    type="video/mp4"
                    onCanPlay={() => console.log("source can play")}
                />
            </video>}
        </div>}
        </Suspense>
        {children}
        </>
    )
}