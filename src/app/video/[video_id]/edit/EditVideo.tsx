import React from 'react'
import EditVideoForm from "./EditVideoForm"
import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();
import { Video } from '@prisma/client'

interface EditVideoFormProps {
    video_id: string;
}

export default async function EditVideo({ video_id }: EditVideoFormProps) {

    let video : Video | null = null;

    try {
        video = await prisma.video.findUnique({
            where: {
                video_id
            }
        });
    } catch (error) {
        console.error(error);
    } finally {
        await cleanup();
    }

    if (!video) return (<p>Video not found</p>);

    return (<EditVideoForm video={video} />);
};