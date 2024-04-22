import AuthorCard from './AuthorCard'
import ChannelTabs from './ChannelTabs'

import { type Playlist, type User, type Video } from '@prisma/client'

type ChannelProps = {
  channelData: {
    videos?: Partial<Video>[];
    playlists?: Partial<Playlist>[];
  } & User
}

function Channel({channelData}: ChannelProps) {
  
  if (!channelData?.tag) throw new Error('Error fetching tag from channelData')

  return (
    <div>
      <AuthorCard channelData={channelData} />
      <ChannelTabs tag={channelData.tag!} />
    </div>
  )
}

export default Channel