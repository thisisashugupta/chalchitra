import Link from 'next/link'
import { Heading } from '@/components/ui/heading'
import CircularButton from '@/components/ui/buttons/CircularButton'

import VideoCardVertical from "@/components/ui/video-card-vertical"
import DisplayInGrid from "@/components/ui/display-in-grid"
import { thumbnailUrl } from "@/lib/exports"

export default function SubscriptionVideos({videos}: {videos: any[]}) {

    if (videos.length===0) return (<div className="flex flex-col items-center">
        <Heading>No Subscriptions</Heading>
        <Link href="/">
            <CircularButton title='Go Home' />
        </Link>
    </div>)

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