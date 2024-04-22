import React from 'react'
import AuthorCard from './AuthorCard'
import ChannelTabs from './ChannelTabs'

function Channel({channelData}: any) {
  return (
    <div>
      <AuthorCard channelData={channelData} />
      <ChannelTabs tag={channelData.tag} />
    </div>
  )
}

export default Channel