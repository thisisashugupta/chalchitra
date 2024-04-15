'use server'
//  fetch like status of video, if user has liked the video, and passes it to a client component for like action

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"

import useLikeStatus from "@/hooks/server/useLikeStatus"
import OptimisticLike from '@/app/watch/VideoDetails/buttons/Like/OptimisticLike'
import RequireLogin from "@/components/RequireLogin"
import ShowLike from "@/app/watch/VideoDetails/buttons/Like/ShowLike"

async function Like({likes, video_id}: {likes: number, video_id: string}) {

  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email

  const { isVideoLiked, error } = await useLikeStatus({ email: userEmail, video_id });
  // TODO: add error handling

  const likeStatus = { 
    likes,
    video_id,
    liked: isVideoLiked as boolean,
    email: userEmail as string,
  }
  // console.log('likeStatus', likeStatus);

  if (!session) 
    return (
      <RequireLogin>
        <ShowLike likeStatus={{liked: false, likes}} />
      </RequireLogin>
    )
  
  return (<OptimisticLike likeData={likeStatus} />)
}

export default Like
