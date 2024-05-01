import { Skeleton } from '@/components/ui/skeleton'

export default function VideoCardVerticalSkeleton() {

    return (
        <div className='md:mx-2 mb-6 flex flex-col gap-1'>
            <Skeleton className='aspect-video rounded-xl' />
            <div className='flex w-full justify-between'>
                {/* Channel PFP */}
                <div>
                    <Skeleton className="ml-2 mt-2 mr-3 w-9 h-9 rounded-full" />
                </div>
                <div className='w-full'>
                    {/* Video Title */}
                    <Skeleton className='h-4 mt-2' />
                    {/* Video Metadata */}
                    <Skeleton className='h-2.5 mt-2 w-3/5' />
                </div>
            </div>
        </div>
    )
}