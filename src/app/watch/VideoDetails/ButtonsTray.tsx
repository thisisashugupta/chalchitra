"use server"

import { Suspense } from "react"
import MoreOptions from "@/app/watch/VideoDetails/buttons/MoreOptions"
import Like from "@/app/watch/VideoDetails/buttons/Like/Like" // server component
import Dislike from "@/app/watch/VideoDetails/buttons/Dislike/Dislike" // client component for now
import Share from "@/app/watch/VideoDetails/buttons/Share"
import Download from "@/app/watch/VideoDetails/buttons/Download"

import { VideoWithAuthor } from "@/types/video"

function ButtonsTray({video}: {video: VideoWithAuthor}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="flex items-left md:items-right space-x-2 overflow-auto hide-scrollbar">
        <div className="min-w-max flex">
            <Like likes={video?.likes!} video_id={video?.video_id!} />
            <Dislike video_id={video?.video_id!} />
        </div>
        <div><Share video_id={video?.video_id!} /></div>
        <div><Download video_id={video?.video_id!} /></div>
        <div><MoreOptions /></div>
    </div>
    </Suspense>
  )
}

export default ButtonsTray
