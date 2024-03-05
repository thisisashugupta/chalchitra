"use server"

import Tags from '@/components/Tags'
import Feed from '@/components/Feed'
import { Suspense } from 'react'
import FeedSkeleton from './loading'

export default async function Home() {

  return (
    <main>
      {/* <div className='fixed top-12 md:top-[56px] md:ml-20 bg-white'></div> */}
      
      {/* md:ml-20 mt-[108px] md:mt-32 */}
        <div className='bg-white'><Tags /></div>
        <div className='z-10'>
          {/* md:pt-14 */}
        <Suspense fallback={<FeedSkeleton />}>
          <Feed />
        </Suspense>
      </div>
      

    </main>
  )
}