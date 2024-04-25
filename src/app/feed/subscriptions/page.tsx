// /feed/subscriptions
'use server'

import { getPrismaClient } from "@/app/providers/PrismaProvider"
import useServerAuth from "@/hooks/server/useServerAuth"
import Link from "next/link"
import SubscriptionVideos from "./SubscriptionVideos"

async function SubscriptionsPage() {

    const { isAuthenticated, user } = await useServerAuth()
    if (!isAuthenticated) return (<>Login to Continue</>)
    
    const prisma = getPrismaClient()

    const videosOfSubscriptions = await prisma.video.findMany({
      where: {
        author: {
          subscribers: {
            some: {
              email: user?.email!
            }
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: 100,
      include: {
        author: true
      }
    });

    if (!videosOfSubscriptions) throw new Error('Error Fetching videosOfSubscriptions')

    return (
        <div className="m-4 flex justify-center">
            <div className='max-w-7xl w-full'>
              <div className="mx-12 mb-4 rounded-full p-2 space-x-2 bg-blue-500/50 flex justify-between">
                  <Link href="/feed/channels" className="w-full text-center">
                      <p className="p-2 rounded-full hover:bg-blue-500/50">Channels</p>
                  </Link>
                  <Link href="/feed/subscriptions" className="w-full text-center">
                      <p className="p-2 rounded-full bg-blue-500">Subscriptions</p>
                  </Link>
              </div>
              <SubscriptionVideos videos={videosOfSubscriptions} />
            </div>
        </div>
    );
}

export default SubscriptionsPage