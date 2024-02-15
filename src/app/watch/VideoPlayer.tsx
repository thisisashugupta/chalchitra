'use server'

const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION

interface VideoPlayerProps {
    v: string
}

export default async function VideoPlayer({v} : VideoPlayerProps) {

    const videoUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${v}`

    return (
        <div className='bg-black flex flex-col items-center justify-center md:mx-4 md:rounded-xl'>
            <video className='max-h-[60vh]' controls autoPlay>
                <source src={videoUrl} type="video/mp4"/>
            </video>
        </div>
    )
}