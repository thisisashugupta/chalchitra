// /feed/channels
'use server'

import { getPrismaClient } from "@/app/providers/PrismaProvider"
import useServerAuth from "@/hooks/server/useServerAuth"
import SubscriptionChannels from "@/app/feed//channels/SubscriptionChannels"
import Link from "next/link"

export default async function Page() {

    const { isAuthenticated, user } = await useServerAuth()
    if (!isAuthenticated) return (<>Login to Continue</>)
    
    const prisma = getPrismaClient()

    const userData = await prisma.user.findUnique({
        where: {
            email: user?.email!
        },
        include: {
            subscriptions: {
                take: 25
            }
        }
    })

    if (!userData) throw new Error('Error Fetching User Data')

    return (
        <div className="m-4 flex justify-center">
            <div className='max-w-7xl w-full'>

            <div className="mx-12 mb-4 rounded-full p-2 space-x-2 bg-blue-500/50 flex justify-between">
                <Link href="/feed/channels" className="w-full text-center">
                    <p className="p-2 bg-blue-500 rounded-full">Channels</p>
                </Link>
                <Link href="/feed/subscriptions" className="w-full text-center">
                    <p className="p-2 rounded-full hover:bg-blue-500/50">Subscriptions</p>
                </Link>
            </div>

                <SubscriptionChannels subscriptions={userData?.subscriptions} />
            </div>
        </div>
    );
}