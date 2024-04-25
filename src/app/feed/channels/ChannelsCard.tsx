import React from 'react'
import Subscribe from '@/app/watch/VideoDetails/Subscribe/Subscribe'
import SubscribersCount from '@/app/watch/VideoDetails/Subscribe/SubscribersCount'
import Link from 'next/link'

export default function SubscriptionsChannelCard({channel}: any) {

  return (
    <div className='flex flex-row justify-left sm:justify-between items-center space-x-4 w-full'>

        <div className='flex'>
        <Link href={`/user/${channel.tag}`} >
            <div className='sm:px-8 lg:16 mx-8 md:mx-12 lg:mx-20 min-w-max'>
                <img 
                className='w-32 h-32 object-cover rounded-full'
                src={channel.photo}
                alt={channel.tag}
                />
            </div>
            </Link>

            <Link href={`/user/${channel.tag}`} >
            <div>
                {/* Channel Name */}
                <div className='mt-2'>
                    <p className='text-xl font-base'>{channel.name}</p>
                </div>
                {/* Channel Metadata */}
                <div className='flex space-x-2 text-gray-400 text-sm'>
                    <p>{channel.tag}</p>
                    <p>•</p>
                    <SubscribersCount subscribers={channel.total_subscribers} className='' />
                </div>
                {/* Channel Bio */}
                <div className='py-8'>
                    <p className='text-sm line-clamp-2 text-gray-500'>{channel.bio}</p>
                </div>
            </div>
            </Link>
        </div>
        
        <div className='hidden sm:block'>
            <Subscribe channel_id={channel.id} subscribers={channel.total_subscribers} />
        </div>

    </div>
  )
}