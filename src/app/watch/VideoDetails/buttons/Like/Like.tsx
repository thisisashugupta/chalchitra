'use server'
//  fetch like status of video, if current user has liked the video, and passes it to a client component for action

import dynamic from "next/dynamic"
const LikeVideo = dynamic(() => import("@/app/watch/VideoDetails/buttons/Like/LikeVideo"), { ssr: false })

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"

import useLikeStatus from "@/hooks/server/useLikeStatus"

async function Like({likes, video_id}: {likes: number, video_id: string}) {

  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email

  const { videoLiked, error } = await useLikeStatus({ email: userEmail, video_id });
  if (error || videoLiked===null || videoLiked===undefined) 
    throw new Error('videoLiked is null or undefined');
  
  if (!session) return (<LikeVideo video_id={video_id} likes={likes} />)
  return (<LikeVideo videoLiked={videoLiked} likes={likes} email={userEmail!} video_id={video_id} />)
}

export default Like
