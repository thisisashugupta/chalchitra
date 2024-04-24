import UploadTime from '@/components/video-card/UploadTime'
import Views from '@/components/video-card/Views'

import { VideoWithAuthor } from '@/types/video'

type VideoMetadataProps = {
  video: VideoWithAuthor,
  className?: string,
  hideAuthor?: boolean
}

function VideoMetadata({video, className, hideAuthor = false}: VideoMetadataProps) {
  return (
    <div className={`mt-1 text-xs text-gray-400 space-x-1 ${className}`}>
        {hideAuthor || 
        <>
          <span>{video?.author?.name}</span>
          <span>•</span>
        </>
        }
        <Views views={video?.views || 0} />
        <span>•</span>
        <UploadTime createdAt={video?.createdAt} />
    </div>
  )
}

export default VideoMetadata
