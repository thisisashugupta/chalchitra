'use client'

import React, { useState } from 'react'
import { permanentRedirect } from 'next/navigation'

interface VideoPlayerProps {
    videoUrl: string
}

export default function VideoPlayer({videoUrl} : VideoPlayerProps) {
    
    if (!videoUrl) permanentRedirect('/');
    
    const [videoReady, setVideoReady] = useState(false);
    const [videoError, setVideoError] = useState(false);

    const handleVideoStart = () => {
        console.log("video start");
    }

    const handleVideoReady = () => {
        setVideoReady(true);
        console.log("video ready, loaded data");
    };

    // TODO: type of event is any // ReactEventHandler<HTMLVideoElement>
    const handleError = (e: any) => {
        console.error("error", e);
        setVideoError(true);
    }

    return (
        <div className='bg-transparent flex flex-col items-center justify-center md:mx-4 md:rounded-xl overflow-hidden'>
            
            {videoError && <div className='w-full aspect-video text-red-500'>Error loading video</div>}
            {!videoError && !videoReady && <div className='w-full aspect-video text-red-500'>Loading...</div>}

            {<video className={`${videoReady ? 'block' : 'hidden'} md:rounded-xl`} controls autoPlay onLoadedData={handleVideoReady} onError={handleError} onLoadStart={handleVideoStart}>
                {/* onPlay={handleVideoReady}  */} 
                {/* onLoadStart={handleVideoReady}  */}
                <source src={videoUrl} type="video/mp4"/>
            </video>}
        </div>
    )
}