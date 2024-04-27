import { CircleUserRound } from 'lucide-react'
import { useRecoilValue } from 'recoil'
import { userAtom } from '@/store/atoms/user'

export default function UserPhoto() {
    const user = useRecoilValue(userAtom)

  return (
    <div>
      {user?.photo ?
        <img className="w-[1.45rem] h-[1.45rem] rounded-full" src={user?.photo} /> :
        <CircleUserRound size={22} strokeWidth={1} />
      }
      <p className='text-center'>You</p>
    </div>
  )
}