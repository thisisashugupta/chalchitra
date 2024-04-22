'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

function ChannelTabs({tag}: {tag: string}) {
    const pathname = usePathname()
    const currentTab = pathname.split("/")[3]
    
  return (
    <div>
        <div className='py-4 flex space-x-6 font-bold text-gray-400'>
            <Link 
                className={currentTab ? '' : 'text-red-500'}
                href={`/user/${tag}`}>
                Home
            </Link>
            <Link
                className={currentTab == 'videos' ? 'text-red-500' : ''}
                href={`/user/${tag}/videos`}>
                Videos
            </Link>
            <Link 
                className={currentTab == 'playlists' ? 'text-red-500' : ''}
                href={`/user/${tag}/playlists`}
                >
                Playlists
            </Link>
        </div>
  </div>
  )
}

export default ChannelTabs
