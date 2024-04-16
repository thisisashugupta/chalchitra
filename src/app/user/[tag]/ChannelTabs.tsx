import Link from 'next/link'
import React from 'react'

function ChannelTabs({tag}: {tag: string}) {
    // TODO: highlight current tab
    
  return (
    <div>
        <div className='py-4 flex space-x-6 font-bold text-gray-400'>
            <Link href={`/user/${tag}/videos`}>
                Videos
            </Link>
            <Link href={`/user/${tag}/playlists`}>
                Playlists
            </Link>
        </div>
  </div>
  )
}

export default ChannelTabs
