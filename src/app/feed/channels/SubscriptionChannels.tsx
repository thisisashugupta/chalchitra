import { Heading } from "@/components/ui/heading"
import { type User } from "@prisma/client"
import SubscriptionsChannelCard from "./ChannelsCard"
import CircularButton from "@/components/ui/buttons/CircularButton"
import Link from "next/link"

function Subscriptions({subscriptions}: {subscriptions: User[]}) {

    if (subscriptions.length===0) return (<div className="flex flex-col items-center">
        <Heading>No Subscriptions</Heading>
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
