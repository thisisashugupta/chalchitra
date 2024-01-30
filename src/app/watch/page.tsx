'use client'
import React from 'react'
import { permanentRedirect, useSearchParams } from 'next/navigation'
// function VideoPage({ params }: { params: { video_id: string } })

export default function VideoPage() {

    const searchParams = useSearchParams()
    const v = searchParams.get('v')
    if (!v) permanentRedirect('/')

    const BUCKET_NAME = process.env.NEXT_PUBLIC_BUCKET_NAME
    const BUCKET_REGION = process.env.NEXT_PUBLIC_BUCKET_REGION

    const videoUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${v}`

    return (
        <div>
            <h1>Video Page</h1>
            <video width="750" controls autoPlay>
                <source src={videoUrl} type="video/mp4"/>
            </video>
        </div>
    )
}