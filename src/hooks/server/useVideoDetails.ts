"use server"

import { type Video, type User } from "@prisma/client"
import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();

type VideoType = Video & { author: Partial<User> } | null

export async function useVideoDetails(v: string) {

    let video: VideoType = null;

    try {
        // fetch video details, along with author name, photo and total subscribers
        const response = await prisma.video.findUnique({
            where: {
                video_id: v
            },
            include: {
                author: {
                    select: {
                        tag: true,
                        name: true,
                        email: true,
                        photo: true,
                        total_subscribers: true,
                    }
                },
            }
        });
        video = response;

        console.log("video:", response);

    } catch (error) {
        console.error(error);
    } finally {
        await cleanup();
    }

    return { video };

}