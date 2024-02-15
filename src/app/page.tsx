"use server"

import Feed from '@/components/Feed'
import { Suspense } from 'react'
import FeedSkeleton from './loading'

export default async function Home() {

  return (
    <main className="md:p-2 bg-white">
      <Suspense fallback={<FeedSkeleton />}>
        <Feed />
      </Suspense>
    </main>
  )
}