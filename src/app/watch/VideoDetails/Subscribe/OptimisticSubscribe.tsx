'use client'

import { useState, useOptimistic } from 'react'
import { handleSubscribe } from "@/app/actions"
import ShowSubscribe from './ShowSubscribe'

// import { subscribeAtom } from '@/store/atoms/subscribe'
// import { useSetRecoilState } from 'recoil'

interface OptimisticSubscribeProps {
  subscribeData: {
      subscribed: boolean,
      subscribers: number,
      email: string,
      id: number
  }
}

export default function OptimisticLike({ subscribeData }: OptimisticSubscribeProps) {

  const defaultSubscribeState = { subscribers: subscribeData?.subscribers, subscribed: subscribeData?.subscribed }

  const [subscribeState, setSubscribeState] = useState(defaultSubscribeState)
  // const setSubscribeState = useSetRecoilState(subscribeAtom)
  // setSubscribeState(defaultSubscribeState)

  const newSubscribeStatus = { 
    subscribed: !subscribeState.subscribed, 
    subscribers: subscribeState.subscribed ? subscribeState.subscribers - 1 : subscribeState.subscribers + 1
  }

  const [optimisticSubscribeStatus, addOptimisticSubscribe] = useOptimistic<
    typeof subscribeState,
    typeof newSubscribeStatus
  >(subscribeState, (_, newLikeStatus) => newLikeStatus);

  const subscribeAction = async () => {
    addOptimisticSubscribe(newSubscribeStatus)
    await handleSubscribe(subscribeData?.email!, subscribeData?.id!);
    // TODO:  if successfully subscribed, only then
    setSubscribeState(newSubscribeStatus)
  }
  
  return (      
    <form action={subscribeAction}>
      <button type="submit">
        <ShowSubscribe subscribed={optimisticSubscribeStatus?.subscribed} />
      </button>
    </form>
  )
}