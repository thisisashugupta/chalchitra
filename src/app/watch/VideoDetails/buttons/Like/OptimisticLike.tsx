'use client'

import { useState, useOptimistic } from 'react'
import { likeVideo } from "@/app/actions"
import ShowLike from './ShowLike'
import { LikeStatus } from "./types"

interface OptimisticLikeProps {
  likeData: {
      liked: boolean,
      email: string, 
      likes: number, 
      video_id: string
  }
}

export default function OptimisticLike({ likeData }: OptimisticLikeProps) {

  const defaultLikeState = { likes: likeData?.likes, liked: likeData?.liked }
  const [likeStatus, setLikeStatus] = useState<LikeStatus>(defaultLikeState)

  const newLikeStatus = { 
    liked: !likeStatus.liked, 
    likes: likeStatus.liked ? likeStatus.likes - 1 : likeStatus.likes + 1 
  }

  const [optimisticLikeStatus, addOptimisticLike] = useOptimistic<
    typeof likeStatus,
    typeof newLikeStatus
  >(likeStatus, (_, newLikeStatus) => newLikeStatus);

  const likeAction = async (formData: FormData) => {
    addOptimisticLike(newLikeStatus)
    await likeVideo(likeData?.email!, likeData?.video_id!);
    // TODO:  if successfully liked, only then
    setLikeStatus(newLikeStatus)
  }
  
  return (      
    <form action={likeAction}>
      <button type="submit">
        <ShowLike likeStatus={optimisticLikeStatus} />
      </button>
    </form>
  )
}