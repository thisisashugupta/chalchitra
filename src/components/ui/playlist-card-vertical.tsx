import Link from 'next/link'

import UploadTime from '@/components/video-card/UploadTime'

import Thumbnail from '@/components/ui/Thumbnail'
import { type Playlist, type User } from '@prisma/client'

type CardProps = {
    playlist: Playlist,
    author?: User,
    thumbnailUrl: string,
    hideAuthor?: boolean,
}

function PlaylistCardVertical({playlist, author, hideAuthor=false, thumbnailUrl}: CardProps) {

    return (
        <Link href={`/playlist?list=${playlist?.id}`}>
        <div className='md:mx-2 mb-6 flex flex-col gap-1'>

            <Thumbnail thumbnailUrl={`${thumbnailUrl}/${playlist?.id}`} />

            <div className='flex w-full justify-between'>

                {/* Channel PFP */}
                {hideAuthor ||  <img 
                    src={ author?.photo || 'https://picsum.photos/200'} 
                    className="ml-2 mt-2 mr-3 w-9 h-9 rounded-full" 
                />}
                
                <div className='flex flex-col w-full'>
                    {/* Playlist Title */}
                    <div className='mt-2 text-sm font-semibold line-clamp-2'>{playlist?.title}</div>

                    <div className={`mt-1 text-xs text-gray-400 space-x-1`}>
                        {hideAuthor || 
                        <>
                        <span>{author?.name}</span>
                        <span>•</span>
                        </>
                        }
                        {/* <Views views={playlist?.views || 0} /> */}
                        <span>•</span>
                        <UploadTime createdAt={playlist?.updatedAt} />
                    </div>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default PlaylistCardVertical