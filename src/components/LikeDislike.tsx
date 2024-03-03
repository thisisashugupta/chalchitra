'use client'

import { ThumbsUp, ThumbsDown } from "lucide-react"

export function Dislike({video_id}: {video_id: string}) {

    const handleDislike = () => {
        console.log("dislike");
        
    }

    return <button className="bg-gray-200 hover:bg-gray-300 rounded-l-none rounded-r-full px-4 py-2" onClick={handleDislike} >
        <div className="flex space-x-2">
            <ThumbsDown strokeWidth={1} size={20} />
        </div>
    </button>
}



export function Like({likes, video_id}: {likes: number, video_id: string}) {

    const handleLike = () => {
        console.log("like");
        
    }


    return <button className="bg-gray-200 hover:bg-gray-300 rounded-l-full rounded-r-none px-4 py-2" onClick={handleLike} >
        <div className="flex space-x-2">
            <ThumbsUp strokeWidth={1} size={20} />
            <p className="text-0.5xs">{likes}</p>
        </div>
    </button>
}

export default {};