'use client'

import React, { useEffect, useState } from 'react'
import { permanentRedirect } from 'next/navigation'

interface VideoPlayerProps {
    videoUrl: string
}

export default function VideoPlayer({videoUrl} : VideoPlayerProps) {
    
    if (!videoUrl) permanentRedirect('/');
    const [videoError, setVideoError] = useState(false);

// TODO: type of event is any // ReactEventHandler<HTMLVideoElement>
    const handleError = (e: any) => {
        console.error("error", e);
        setVideoError(true);
    }

    return (
        <div className='bg-transparent flex flex-col items-center justify-center mt-6 md:rounded-xl overflow-hidden'>
            
            {videoError && <div className='bg-black w-full aspect-video text-red-500 flex items-center justify-center'>
                <p>Video failed to load</p>
            </div>}
            
            {!videoError &&
            <video 
                className="md:rounded-xl" 
                // make thumbnail_id and video_id same
                poster={`https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_BUCKET_REGION}.amazonaws.com/thumbnails/38eaabe3554423e614d1ca25951254fd`}
                preload="auto"
                controls 
                // loop
                autoPlay 
                onLoadedData={() => console.log("video loaded data")}
                onLoadStart={() => console.log("video load start")}
                onPlay={() => console.log("video play")}
                onCanPlay={() => console.log("video can play")}
                onError={handleError}
            >
                <source src={videoUrl} type="video/mp4" onCanPlay={() => console.log("can play")}/>
            </video>}
        </div>
    )
}