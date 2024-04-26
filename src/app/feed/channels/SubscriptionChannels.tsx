import Link from "next/link"
import { Heading } from "@/components/ui/heading"
import CircularButton from "@/components/ui/buttons/CircularButton"

import SubscriptionsChannelCard from "@/components/cards/ChannelCard"
import { type User } from "@prisma/client"

function Subscriptions({subscriptions}: {subscriptions: User[]}) {

    if (subscriptions.length===0) return (<div className="flex flex-col items-center">
        <Heading>No Channels</Heading>
        <Link href="/">
            <CircularButton title='Go Home' />
        </Link>
    </div>)

  return (
    <div>
        <div className="space-y-4">
        {subscriptions.map(subscription => (
            <div key={subscription.id}>
                <SubscriptionsChannelCard channel={subscription} />
            </div>
        ))}
        </div>

    </div>
  )
}

export default Subscriptions
