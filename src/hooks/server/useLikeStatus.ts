'use server'

import { getPrismaClient } from '@/app/providers/PrismaProvider'
const prisma = getPrismaClient()

type UseLikeStatusProps = {
    email?: string | null | undefined, 
    video_id: string | null | undefined 
}

async function useLikeStatus({email, video_id}: UseLikeStatusProps) {
    if (!email) return { error: 'email is required' }
    if (!video_id) return { error: 'video_id is required' }

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
        return { isVideoLiked: null, error: 'error occurred while fetching like status of video'};
    }
}

export default useLikeStatus
