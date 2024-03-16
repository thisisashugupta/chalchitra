'use client'

import React, { useRef, useEffect, useState, /* useReducer, useCallback */ } from 'react'
import { useRecoilValue } from 'recoil'
import { videoState } from '@/app/providers/RecoilProvider'
import { useSearchParams } from 'next/navigation'
import VideoPlayerTemplate from '@/app/watch/VideoPlayerTemplate'
console.log('VideoPlayer page');

const BUCKET_NAME = process.env.NEXT_PUBLIC_BUCKET_NAME
const BUCKET_REGION = process.env.NEXT_PUBLIC_BUCKET_REGION

export default function VideoPlayer() {
    console.log('VideoPlayer Component')
    const v = useRecoilValue(videoState)    
    console.log('v',v)
    // const searchparams = useSearchParams()
    // const video_id = searchparams.get('v')
    const videoUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/videos/${v}`
    const thumbnailUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/thumbnails/${v}`
    const videoRef = useRef<HTMLVideoElement>()
    const [mounted, setMounted] = useState(false)
    const [videoError, setVideoError] = useState(false)

    const pauseVideo = async () => videoRef.current?.pause()
    pauseVideo();

    useEffect(() => {
        setMounted(true)
        console.log('mounted')
        return function() {
            // setMounted(false)
            console.log('unmounted')
        }
    }, [])

// TODO: type of event is any // ReactEventHandler<HTMLVideoElement>
    const handleError = (e: any) => {
        console.error("error", e);
        setVideoError(true);
    }

    return (<>
        {!mounted && <VideoPlayerTemplate className="md:mt-6" text='Video Loading...' />}
        {mounted && <div className='bg-transparent w-full flex flex-col items-center justify-center md:mt-6 overflow-hidden'>
            {videoError && <VideoPlayerTemplate text='Video failed to load.' />}
            {!videoError &&
            <video 
                key={v}
                id='video-tag'
                className="md:rounded-xl max-h-[75vh]"
                // TODO: make thumbnail_id and video_id same
                // poster={thumbnailUrl}
                // autoPlay={mounted}
                controls 
                // loop
                playsInline // for iOS
                preload="auto"
                onLoadStart={() => console.log("video load start")}
                onLoadedData={() => console.log("video loaded data")}
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
        </>
    )
}