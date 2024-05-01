import { Skeleton } from '@/components/ui/skeleton'
import SubscriptionsChannelCardSkeleton from '@/components/ui/skeletons/SubscriptionChannelCardSkeleton'

export default function() {
    return (
        <div className="m-4 flex justify-center">
            <div className='max-w-7xl w-full'>

            <div className="mx-12 mb-4 rounded-full p-2 space-x-2 bg-blue-500/50 flex justify-between">
                <div className="w-full text-center">
                    <Skeleton className="h-10 p-2 rounded-full bg-blue-500" />
                </div>
                <div className="w-full text-center">
                    <Skeleton className="h-10 p-2 rounded-full" />
                </div>
            </div>

            <div>
                <div className="space-y-4">
                {Array.from({length: 10}).map((_,i) => (
                    <div key={i}>
                        <SubscriptionsChannelCardSkeleton />
                    </div>
                ))}
                </div>

            </div>
            </div>
        </div>
    )
}