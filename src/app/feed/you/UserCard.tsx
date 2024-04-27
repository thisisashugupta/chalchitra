import Link from "next/link"
import { type User } from "@prisma/client"
import CircularButton from "@/components/ui/buttons/CircularButton"

export default function UserCard({userData}: { userData: Partial<User> }) {
  return (
    <div>
    <div className='flex flex-row justify-left items-center'>
        
        <img 
          className='w-20 h-20 sm:w-36 sm:h-36 sm:mr-8 mr-4 object-cover rounded-full'
          src={userData.photo!} 
          alt={userData.tag!} 
        />
        
        <div>
          <div className='text-xl sm:text-4xl font-bold'>{userData.name}</div>

          <div className='flex space-x-2 text-gray-400 text-xs sm:text-sm'>

            <p>{userData.tag}</p>
            <p>•</p>
            <p>{userData.total_subscribers} subscribers</p>
            <p>•</p>
            <p>{userData.total_videos} videos</p>
          
          </div>

          <div className='py-2 text-xs sm:text-sm'>
            <p>{userData.bio}</p>
          </div>
          
        </div>
    </div>
    <div className="my-2 flex gap-2">
      <Link href={`/user/${userData?.tag}`}><CircularButton title={'View Channel'} /></Link>
      <Link href="/api/auth/signout?callbackUrl=/"><CircularButton title={'Logout'} /></Link>
    </div>
  </div>
  )
}