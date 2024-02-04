'use client'
import { useState, useEffect } from 'react'
import { permanentRedirect, useSearchParams } from 'next/navigation'
// function VideoPage({ params }: { params: { video_id: string } })

export default function VideoPage() {

    const [createdAt, setCreatedAt] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const searchParams = useSearchParams()
    const v = searchParams.get('v')
    if (!v) permanentRedirect('/')

    const BUCKET_NAME = process.env.NEXT_PUBLIC_BUCKET_NAME
    const BUCKET_REGION = process.env.NEXT_PUBLIC_BUCKET_REGION

    const videoUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${v}`

    useEffect(() => {
        async function fetchVideoData() {
            
            const response = await fetch(`/api/video?v=${v}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            const body = await response.json()
            setCreatedAt(body.createdAt)
            setTitle(body.title)
            setDescription(body.content)
            
        }
        fetchVideoData()
    }, [v])


    return (
        <div>
            <h1>Video Page</h1>
            <video width="750" controls autoPlay>
                <source src={videoUrl} type="video/mp4"/>
            </video>
            <h2 className='text-xl font-black'>{title}</h2>
            <p>{description}</p>
            <p>Uploaded on {createdAt.substring(0,10)}</p>
        </div>
    )
}