"use server"

import { Suspense } from 'react'

import Tags from '@/components/Tags'
import Feed from '@/components/Feed'
import { FeedSkeleton } from './loading'

export default async function Home() {

  return (
    <>
      <Tags />
      <div className='z-10'>
        <Suspense fallback={<FeedSkeleton />}>
          <Feed />
        </Suspense>
      </div>
    </>
  )
}