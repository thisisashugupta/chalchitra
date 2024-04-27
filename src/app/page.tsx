"use server"

import { Suspense } from 'react'

import Tags from '@/components/Tags'
import Feed from '@/components/Feed'
import FeedSkeleton from '@/components/ui/skeletons/FeedSkeleton'

export default async function Home() {

  return (
    <>
      <Tags />
      <div className='z-10'>
        <Suspense fallback={<div className="md:mx-4 md:my-6"><FeedSkeleton /></div>}>
          <Feed />
        </Suspense>
      </div>
    </>
  )
}