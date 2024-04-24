import React from 'react'

function UserCard({userData}: any) {
  return (
    <div className='flex flex-col sm:flex-row justify-left'>
        
        <img 
          className='w-36 h-36 mr-8 object-cover rounded-full'
          src={userData.photo} 
          alt={userData.tag} 
        />
        
        <div className=''>
          <div className='mt-2 text-4xl font-bold'>{userData.name}</div>

          <div className='flex space-x-2 text-gray-400 text-sm'>

            <p>{userData.tag}</p>
            <p>•</p>
            <p>{userData.total_subscribers} subscribers</p>
            <p>•</p>
            <p>{userData.total_videos} videos</p>
          
          </div>

          <div className='py-2 text-sm'>
            <p>{userData.bio}</p>
          </div>
          
        </div>
    </div>
  )
}

export default UserCard
