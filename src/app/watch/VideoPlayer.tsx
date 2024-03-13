'use client'

import React, { useEffect, useState, useReducer } from 'react'
import { permanentRedirect } from 'next/navigation'

interface VideoPlayerProps {
    videoUrl: string,
    thumbnailUrl: string
}

export default function VideoPlayer({videoUrl, thumbnailUrl} : VideoPlayerProps) {
    
    if (!videoUrl) permanentRedirect('/');
    const [videoError, setVideoError] = useState(false);
    
    useEffect(() => {
        console.log("videoUrl changed, set video error false");
        setVideoError(false);
    }, [videoUrl])

// TODO: type of event is any // ReactEventHandler<HTMLVideoElement>
    const handleError = (e: any) => {
        console.error("error", e);
        setVideoError(true);
    }

    return (
        <div className='bg-transparent w-full flex flex-col items-center justify-center md:mt-6 overflow-hidden'>
            
            {videoError && <div className='bg-black w-full aspect-video text-red-500 flex items-center justify-center'>
                <p>Video failed to load</p>
            </div>}
            
            {!videoError &&

            <video 
                key={videoUrl}
                className="md:rounded-xl max-h-[75vh]"
                // TODO: make thumbnail_id and video_id same
                // poster={thumbnailUrl}
                preload="auto"
                controls 
                loop
                autoPlay 
                onLoadedData={() => console.log("video loaded data")}
                onLoadStart={() => console.log("video load start")}
                onPlay={() => console.log("video play")}
                onCanPlay={() => console.log("video can play")}
                onError={handleError}
            >
                <source src={videoUrl} type="video/mp4" onCanPlay={() => console.log("source can play")}/>
            </video>}
        </div>
    )
}