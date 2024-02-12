'use client'

import { useState, useEffect } from 'react'
import { permanentRedirect, useSearchParams } from 'next/navigation'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
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
        <main className='flex flex-col items-center justify-center'>
        <div className='max-w-7xl'>

            <div className='md:mx-4'>
            <video className='max-h-screen md:rounded-xl' controls autoPlay>
                <source src={videoUrl} type="video/mp4"/>
            </video>
            </div>
                
            <div>
                <p className='mx-4 mt-2 text-lg font-bold'>{title}</p>
                <p className='mx-4 text-xs text-gray-500'>25K views . 4 weeks ago . <span className='text-black'>...more</span></p>
                <Accordion className='mx-4 my-2 px-4 border bg-slate-200 rounded-lg' type="single" collapsible>
                    <AccordionItem value="item-1">
                    <AccordionTrigger>
                        Description
                    </AccordionTrigger>
                    <AccordionContent>
                        <p>{description}</p>
                        <p className='mt-2 text-xs text-gray-500'>Uploaded on {createdAt.substring(0,10)}</p>
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
        </main>
    )
}