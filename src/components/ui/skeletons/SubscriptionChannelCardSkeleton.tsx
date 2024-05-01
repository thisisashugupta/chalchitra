import { Skeleton } from "../skeleton"
import ShowSubscribeSkeleton from "./ShowSubscribeSkeleton"

export default function SubscriptionsChannelCardSkeleton() {

  return (
    <div className='flex flex-row justify-left sm:justify-between items-center space-x-4 w-full'>

        <div className='flex w-full'>
        
            <div className='sm:px-8 lg:16 mx-8 md:mx-12 lg:mx-20 min-w-max'>
                <Skeleton className='w-32 h-32 object-cover rounded-full' />
            </div>
            <div className="w-full">
                {/* Channel Name */}
                <Skeleton className='h-4 mt-2' />
                {/* Channel Metadata */}
                <Skeleton className='h-2.5 mt-2 w-4/5' />
                {/* Channel Bio */}
                <div className='py-8'>
                    <Skeleton className='h-2.5 mt-2 w-3/5' />
                    <Skeleton className='h-2.5 mt-2 w-3/5' />
                </div>
            </div>
            
        </div>
        
        <div className='hidden sm:block'>
            <ShowSubscribeSkeleton />
        </div>

    </div>
  )
}