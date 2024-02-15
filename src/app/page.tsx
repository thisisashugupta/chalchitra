"use server"

import Feed from '@/components/Feed'
import { Suspense } from 'react'
import FeedSkeleton from './loading'

export default async function Home() {

  return (
    <main className="md:p-2 bg-white">
      <p className='mx-2 my-4'>Home</p>
      <Suspense fallback={<FeedSkeleton />}>
        <Feed />
      </Suspense>
    </main>
  )
}