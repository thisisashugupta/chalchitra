"use server"

import MoreOptions from "@/app/watch/VideoDetails/buttons/MoreOptions"
import { Like, Dislike } from "@/app/watch/VideoDetails/buttons/LikeDislike"
import Share from "@/app/watch/VideoDetails/buttons/Share"
import Download from "@/app/watch/VideoDetails/buttons/Download"

function ButtonsTray({video}: any) {
  return (
    <div id="right" className="flex items-left md:items-right space-x-2 overflow-auto hide-scrollbar">
        <div className="min-w-max">
            <Like email={video?.author?.email} video_id={video?.video_id} likes={video?.likes} />
            <Dislike video_id={video?.video_id} />
        </div>
        <div><Share video_id={video?.video_id} /></div>
        <div><Download video_id={video?.video_id} /></div>
        <div><MoreOptions /></div>
    </div>
  )
}

export default ButtonsTray
