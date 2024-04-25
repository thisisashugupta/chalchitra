'use server'
// fetch subscribe status of channel, if user has subscribed to the channel, and passes it to a client component for subscribe action

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"

import useSubscribeStatus from "@/hooks/server/useSubscribeStatus"
import OptimisticSubscribe from '@/app/watch/VideoDetails/Subscribe/OptimisticSubscribe'
import RequireLogin from "@/components/RequireLogin"
import ShowSubscribe from "@/app/watch/VideoDetails/Subscribe/ShowSubscribe"

type SubscribeProps = {
  channel_id: number | null | undefined,
  subscribers: number
}

async function Subscribe({channel_id, subscribers}: SubscribeProps) {

  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email

  const { isUserSubscribed, error } = await useSubscribeStatus({ email: userEmail, id: channel_id });
  // TODO: add error handling

  const subscribeStatus = { 
    subscribed: isUserSubscribed as boolean,
    subscribers: subscribers as number,
    email: userEmail! as string,
    id: channel_id as number,
  }

  if (!session) 
    return (
      <RequireLogin>
        <ShowSubscribe subscribed={false} />
      </RequireLogin>
    )
  
  return (<OptimisticSubscribe subscribeData={subscribeStatus} />)
}

export default Subscribe
