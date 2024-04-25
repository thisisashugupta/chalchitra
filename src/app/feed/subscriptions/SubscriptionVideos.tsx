import VideoCardVertical from "@/components/ui/video-card-vertical"
import DisplayInGrid from "@/components/ui/display-in-grid"
import { thumbnailUrl } from "@/lib/exports"


export default function SubscriptionVideos({videos}: {videos: any[]}) {
  return (
    <div>
        <DisplayInGrid>
            {
                videos.map(video => (
                    <div key={video.id}>
                        <VideoCardVertical video={video} thumbnailUrl={thumbnailUrl} />
                    </div>
                ))
            }
        </DisplayInGrid>
    </div>
  )
}