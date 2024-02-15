import React from 'react'
import EditVideoForm from "./EditVideoForm"
import { prisma } from "@/app/providers/PrismaProvider"
import { Video } from '@prisma/client'

interface EditVideoFormProps {
    video_id: string;
}

export default async function EditVideo({ video_id }: EditVideoFormProps) {

    const video : Video | null = await prisma.video.findUnique({
        where: {
            video_id
        }
    });
    console.log('video from EditVideo.tsx');

    if (!video) return (<p>Video not found</p>);

    return (<EditVideoForm video={video} />);
};