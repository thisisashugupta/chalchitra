import React from 'react'

export default function VideoPage({ params }: { params: { video_id: string } }) {

    const BUCKET_NAME = process.env.BUCKET_NAME
    const BUCKET_REGION = process.env.BUCKET_REGION

    const videoUrl = `https:/${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${params.video_id}`

    return (
        <div>
            <h1>Video Page</h1>
            <video width="750" controls autoPlay>
                <source src={videoUrl} type="video/mp4"/>
            </video>
        </div>
    )
}