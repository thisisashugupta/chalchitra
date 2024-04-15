'use client'

import { useState } from "react"
import { likeVideo } from "@/app/actions"
import { useSession } from "next-auth/react"
import { OptimisticLike } from "./OptimisticLike"

interface LikeProps {
    videoLiked?: boolean,
    email?: string, 
    likes: number, 
    video_id: string
}

export function LikeVideo({videoLiked=false, likes, email, video_id}: LikeProps) {

    const { data: session, status } = useSession()

    const [openLoginModal, setOpenLoginModal] = useState(false);

    const like = async () => {
        const likedVideo = await likeVideo(email!, video_id);
        console.log('liked', likedVideo);
    }

    const handleLike = async () => {
        if (!openLoginModal && status === "authenticated") {
            like();
        } else setOpenLoginModal(true);
    }

    return <>
        {openLoginModal && <div className="z-10 fixed top-0 left-0 right-0 h-screen bg-gray-500/90 flex items-center justify-center">
            <div className="p-24 flex flex-col items-center">
                <p className="px-4 py-3 text-lg font-semibold" >Please Login!</p>
                <button className="mx-auto bg-black text-white px-4 py-3 font-semibold" onClick={() => setOpenLoginModal(false)}>Okay</button>
            </div>
        </div>}
        <OptimisticLike defaultLikeStatus={{ liked: videoLiked, likes }} likeAction={handleLike} />
    </>
}

export default LikeVideo