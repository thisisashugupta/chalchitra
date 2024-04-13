"use server"

// import Image from 'next/image'
import SubscribeButton from '@/app/watch/VideoDetails/SubscribeButton'
import { type User } from "@prisma/client"
import Link from 'next/link';

type VideoDetailsAuthorCardProps = {
    author: Partial<User> | undefined;
}

function VideoDetailsAuthorCard({ author }: VideoDetailsAuthorCardProps) {
  return (
    <div className="flex items-left">
        
        <Link href={`/user/${author?.tag}`}>
            <img
                src={author?.photo || ""}
                alt="avatar"
                width={100}
                height={100}
                className="w-10 h-10 rounded-full mr-4"
            />
        </Link>

        <div>
            <Link href={`/user/${author?.tag}`}>
                <p className="font-semibold text-base">{`${author?.name}`}</p>
            </Link>
            <p className="min-w-max font-base text-xs text-gray-500">{`${author?.total_subscribers}`} subscribers</p>
        </div>
        
        <div className="ml-6 flex items-center">
            <SubscribeButton/>
        </div>
    </div>
  )
}

export default VideoDetailsAuthorCard
