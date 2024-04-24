import React from 'react'
import Subscribe from '@/app/watch/VideoDetails/Subscribe/Subscribe'

function AuthorCard({channelData}: any) {
  return (
    <div className='flex flex-col sm:flex-row justify-left'>
        
        <img 
          className='w-36 h-36 mr-8 object-cover rounded-full'
          src={channelData.photo} 
          alt={channelData.tag} 
        />
        
        <div className=''>
          <div className='mt-2 text-4xl font-bold'>{channelData.name}</div>

          <div className='flex space-x-2 text-gray-400 text-sm'>

            <p>{channelData.tag}</p>
            <p>•</p>
            <p>{channelData.total_subscribers} subscribers</p>
            <p>•</p>
            <p>{channelData.total_videos} videos</p>
          
          </div>

          <div className='py-2 text-sm'>
            <p>{channelData.bio}</p>
          </div>

          <div>
            <Subscribe channel_id={channelData.id} subscribers={channelData.total_subscribers} />
          </div>

          
        </div>
    </div>
  )
}

export default AuthorCard
