import UploadTime from '@/components/video-card/UploadTime'
import Views from '@/components/video-card/Views'

import { VideoWithAuthor } from '@/types/video'

type VideoMetadataProps = {
  video: VideoWithAuthor,
  hideAuthor?: boolean
}

function VideoMetadata({video, hideAuthor = false}: VideoMetadataProps) {
  return (
    <div className='mt-1 text-xs text-gray-500 space-x-1'>
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
