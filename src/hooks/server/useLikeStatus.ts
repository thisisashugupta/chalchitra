'use server'

import { getPrismaClient } from '@/app/providers/PrismaProvider'
const prisma = getPrismaClient()

async function useLikeStatus({email, video_id}: {email: string, video_id: string}) {

    try {
        // searching of among the videos liked by user, if the video with video_id is present
        const userLikedVideoData = await prisma.user.findUnique({
            where: { email },
            select: {
                liked_videos: {
                    where: { video_id },
                    select: { video_id: true }
                }
            }
        })
        const videoLiked = userLikedVideoData?.liked_videos.length === 0 ? false : true;
        return { videoLiked };
    } catch (error) {
        console.error(error);
        return { isVideoLiked: null };
    }
}

export default useLikeStatus
