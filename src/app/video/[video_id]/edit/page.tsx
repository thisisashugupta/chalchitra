'use server'

import EditVideo from "./EditVideo"
import { Badge } from "@/components/ui/badge"
import { Suspense } from "react"
import EditVideoSkeleton from "./loading"

interface EditVideoPageProps {
    params: {
        video_id: string;
    }
}

export default async function EditVideoPage({ params }: EditVideoPageProps) {
    const video_id = params.video_id;

    return (
        <main className='w-full min-w-screen flex justify-center'>
        <div className='w-full max-w-3xl p-4 flex flex-col items-center gap-4'>
            
            <Badge variant="outline">Edit Video</Badge>
            <p className='text-center'>video_id: <span className='text-sm font-semibold'>{video_id}</span></p>
            <Suspense fallback={<EditVideoSkeleton />}>
                <EditVideo video_id={video_id} />
            </Suspense>
        </div>
        </main>
    );
};