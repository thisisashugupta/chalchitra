"use client"

import React from 'react'
import { formatNumber } from '@/lib/number'
// import { useRecoilValue } from 'recoil'
// import { subscribeAtom } from '@/store/atoms/subscribe'

// TODO: subscriber count should be updated when user subscribes

function SubscribersCount({subscribers}: {subscribers: number}) {

//     const subscribeState = useRecoilValue(subscribeAtom)
//     console.log('subscribeState FROM COUNT', subscribeState);
    

    const subscribersInShort = formatNumber(subscribers); // TODO: convert number to small form

    return (
        <p className="min-w-max font-base text-xs text-gray-500">
            {`${subscribersInShort} subscriber${subscribers > 1 ? 's' : ''}`}
        </p>
    )
}

export default SubscribersCount
