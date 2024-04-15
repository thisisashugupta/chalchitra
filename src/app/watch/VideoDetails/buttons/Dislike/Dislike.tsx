'use client'

import { useState } from "react"
import { ThumbsDown } from "lucide-react"
import { useSession } from "next-auth/react"

interface DislikeProps {
    email?: string, 
    likes?: number, 
    video_id: string
}

export function Dislike({video_id}: DislikeProps) {

    const { data: session, status } = useSession()

    const [openLoginModal, setOpenLoginModal] = useState(false);

    const handleDislike = async () => {
        if (!openLoginModal && status === "authenticated") {
            // console.log('disliked');
        } else {
            setOpenLoginModal(true);
        }
        
    }

    return <div>
        {openLoginModal && <div className="z-10 fixed top-0 left-0 right-0 h-screen bg-gray-500/90 flex items-center justify-center">
            <div className="p-24 flex flex-col items-center">
                <p className="px-4 py-3 text-lg font-semibold" >Please Login!</p>
                <button className="mx-auto bg-black text-white px-4 py-3 font-semibold" onClick={() => setOpenLoginModal(false)}>Okay</button>
            </div>
        </div>}
    <button className="rounded-l-none rounded-r-full px-3 py-2 bg-gray-200 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600/70" onClick={handleDislike} >
        <div className="flex space-x-2">
            <ThumbsDown strokeWidth={1} size={20} />
        </div>
    </button>
    </div>
}

export default Dislike