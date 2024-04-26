'use server'
import useUserData from '@/hooks/server/useUserData'
import { CircleUserRound } from 'lucide-react'

async function UserPhoto() {

    const { user } = await useUserData()

  return (
    <div>
      {user ?
        <img className="w-[1.45rem] h-[1.45rem] rounded-full" src={ user?.photo || 'https://picsum.photos/200'} /> :
        <CircleUserRound size={22} strokeWidth={1} />
      }
      <p className='text-center'>You</p>
    </div>
  )
}

export default UserPhoto
