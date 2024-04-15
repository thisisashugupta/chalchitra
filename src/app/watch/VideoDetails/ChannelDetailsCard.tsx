"use server"

// import Image from 'next/image'
import Subscribe from '@/app/watch/VideoDetails/Subscribe/Subscribe'
import SubscribersCount from '@/app/watch/VideoDetails/Subscribe/SubscribersCount'
import { type User } from "@prisma/client"
import Link from 'next/link';

type ChannelDetailsCardProps = {
    author: Partial<User> | undefined;
}

function ChannelDetailsCard({ author }: ChannelDetailsCardProps) {
  return (
    <div className="flex items-left">
        
        <Link href={`/user/${author?.tag}`}>
            {/* Channel PFP */}
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
                {/* Channel Name */}
                <p className="font-semibold text-base">{`${author?.name}`}</p>
            </Link>
            {/* Subscribers Count */}
            <SubscribersCount subscribers={author?.total_subscribers || 0} />
        </div>
        
        <div className="ml-6 flex items-center">
            <Subscribe channel_id={author?.id} subscribers={author?.total_subscribers || 0} />
        </div>
    </div>
  )
}

export default ChannelDetailsCard
