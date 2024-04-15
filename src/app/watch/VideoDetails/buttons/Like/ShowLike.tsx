import { ThumbsUp } from "lucide-react"
import { LikeStatus } from "./types"

export function ShowLike({optimisticLikeStatus}: { optimisticLikeStatus: LikeStatus }) {
  return (
      <div className="px-3 py-2 rounded-l-full rounded-r-none bg-gray-200 dark:bg-gray-700/80 hover:bg-gray-300 dark:hover:bg-gray-600/70" >
        <div className="flex space-x-2">
            <ThumbsUp strokeWidth={1} size={20} color={optimisticLikeStatus.liked ? "red" : "white"} />
            <p className="text-0.5xs">{optimisticLikeStatus.likes}</p>
        </div>
    </div>
  );
}