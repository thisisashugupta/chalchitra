import React from 'react'
import Link from 'next/link'
import { CarouselItem } from "@/components/ui/carousel"
import CarouselWrapper from '@/components/ui/CarouselWrapper'
import { type Playlist } from '@prisma/client'
import ViewAllButton from '@/components/ui/buttons/ViewAllButton'
import PlaylistCardVertical from '@/components/ui/playlist-card-vertical'
import { playlistUrl as thumbnailUrl } from '@/lib/exports'
import { Heading } from '@/components/ui/heading'

function PlaylistShowcase({playlists}: {playlists: Playlist[]}) {

  return (<div>

        <div className='flex justify-between'>
            <p className='text-xl font-bold py-2'>Playlists</p>
            <Link href='/feed/playlists'><ViewAllButton/></Link>
        </div>
        
        { playlists.length<=0 ? 
        <Heading>No Playlists</Heading> : 
        <CarouselWrapper>
            {playlists.map((playlist, index) => (
                <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <PlaylistCardVertical 
                        playlist={playlist} 
                        thumbnailUrl={thumbnailUrl}
                        hideAuthor 
                    />
                </CarouselItem>
            ))}
        </CarouselWrapper>}
    </div>
  )
}

export default PlaylistShowcase
