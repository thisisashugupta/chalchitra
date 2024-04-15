import { useState, useOptimistic } from 'react'
import { ShowLike } from './ShowLike'
import { LikeStatus } from "./types"

type OptimisticLikeProps = {
  defaultLikeStatus: LikeStatus, 
  likeAction: () => Promise<any>
}

export function OptimisticLike({defaultLikeStatus, likeAction}: OptimisticLikeProps) {

  const [likeStatus, setLikeStatus] = useState<LikeStatus>(defaultLikeStatus)

  const newLikeStatus = { 
    liked: !likeStatus.liked, 
    likes: likeStatus.liked ? likeStatus.likes - 1 : likeStatus.likes + 1 
  }

  const [optimisticLikeStatus, addOptimisticLike] = useOptimistic<
    typeof likeStatus,
    typeof newLikeStatus
  >(likeStatus, (_, newLikeStatus) => newLikeStatus);

  const handleSubmit = async (formData: FormData) => {
    addOptimisticLike(newLikeStatus)
    await likeAction()
    //   if successfully liked, only then
    setLikeStatus(newLikeStatus)
  }
  
  return (      
    <form action={handleSubmit}>
      <button type="submit">
        <ShowLike optimisticLikeStatus={optimisticLikeStatus} />
      </button>
    </form>
  )
}