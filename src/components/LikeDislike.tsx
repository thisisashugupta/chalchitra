'use client'

import { useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { likeVideo } from "@/app/actions"
import { useSession } from "next-auth/react"

interface LikeProps {
    email: string, 
    likes: number, 
    video_id: string
}

export function Dislike({video_id}: {video_id: string}) {

    const { data: session, status } = useSession()

    const [openLoginModal, setOpenLoginModal] = useState(false);

    const handleDislike = async () => {
        if (!openLoginModal && status === "authenticated") {
            console.log('disliked');
        } else {
            setOpenLoginModal(true);
        }
        
    }

    return <>
        {openLoginModal && <div className="z-10 fixed top-0 left-0 right-0 h-screen bg-gray-500/90 flex items-center justify-center">
            <div className="p-24 bg-white flex flex-col items-center">
                <p className="px-4 py-3 text-lg font-semibold" >Please Login!</p>
                <button className="mx-auto bg-black text-white px-4 py-3 font-semibold" onClick={() => setOpenLoginModal(false)}>Okay</button>
            </div>
        </div>}
    <button className="bg-gray-200 hover:bg-gray-300 rounded-l-none rounded-r-full px-3 py-2" onClick={handleDislike} >
        <div className="flex space-x-2">
            <ThumbsDown strokeWidth={1} size={20} />
        </div>
    </button>
    </>
}



export function Like({email, likes, video_id}: LikeProps) {

    const { data: session, status } = useSession()

    const [openLoginModal, setOpenLoginModal] = useState(false);

    const handleLike = async () => {
        if (!openLoginModal && status === "authenticated") {
            const likedVideo = await likeVideo(email, video_id);
            console.log('liked', likedVideo);
        } else setOpenLoginModal(true);
    }


    return <>
        {openLoginModal && <div className="z-10 fixed top-0 left-0 right-0 h-screen bg-gray-500/90 flex items-center justify-center">
            <div className="p-24 bg-white flex flex-col items-center">
                <p className="px-4 py-3 text-lg font-semibold" >Please Login!</p>
                <button className="mx-auto bg-black text-white px-4 py-3 font-semibold" onClick={() => setOpenLoginModal(false)}>Okay</button>
            </div>
        </div>}
    <button className="bg-gray-200 hover:bg-gray-300 rounded-l-full rounded-r-none px-3 py-2" onClick={handleLike} >
        <div className="flex space-x-2">
            <ThumbsUp strokeWidth={1} size={20} />
            <p className="text-0.5xs">{likes}</p>
        </div>
    </button>
    </>
}

export default {};