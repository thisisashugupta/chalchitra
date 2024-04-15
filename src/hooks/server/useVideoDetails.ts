"use server"

import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();

import { VideoWithAuthor } from "@/types/video"

export async function useVideoDetails(v: string) {

    let video = {} as VideoWithAuthor;

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
        video = response as VideoWithAuthor;

        console.log("video:", response);

    } catch (error) {
        console.error(error);
    } finally {
        await cleanup();
    }

    return { video };

}