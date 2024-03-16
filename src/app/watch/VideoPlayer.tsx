'use client'
import { videoState } from '@/app/providers/RecoilProvider'
import { permanentRedirect, useSearchParams } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import React, { useRef, useEffect, useState, /* useReducer, useCallback */ } from 'react'
import VideoPlayerTemplate from '@/app/watch/VideoPlayerTemplate'
console.log('VideoPlayer page');

const BUCKET_NAME = process.env.NEXT_PUBLIC_BUCKET_NAME
const BUCKET_REGION = process.env.NEXT_PUBLIC_BUCKET_REGION

export default function VideoPlayer() {
    const searchParams = useSearchParams()
    const v = searchParams.get('v')
    if (!v) permanentRedirect('/')
    const getVideoState = useRecoilValue(videoState)
    const video_id = (getVideoState === '') ? v : getVideoState
    const videoUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/videos/${video_id}`
    const thumbnailUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/thumbnails/${video_id}`
    
    const videoRef = useRef<any>()
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
                onCanPlay={() => {
                    // playVideo()
                    console.log("video can play")
                }}
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