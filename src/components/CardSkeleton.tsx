import { MoreVertical } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

export default function CardSkeleton() {

    return (
        
        <div className='flex flex-col gap-1'>
            <Skeleton className="w-full aspect-video md:rounded-xl" />
            <div className='flex w-full justify-between pl-2'>
                <Skeleton className="mt-2 mr-3 w-9 h-9 rounded-full" />
                
                <div className='flex flex-col w-full'>
                    <Skeleton className='mt-2 text-sm font-semibold' />
                    <div className='mt-1 text-xs text-gray-500 space-x-1'>
                        <span><Skeleton /></span>
                        <span>•</span>
                        <span><Skeleton /></span>
                        <span>•</span>
                        <span><Skeleton /></span>
                    </div>
                </div>
                
                <div>
                    <div className='mt-2 ml-3 w-10 h-10 text-center p-2 rounded-full font-bold hover:bg-gray-300'><MoreVertical /></div>
                </div>
            </div>
        </div>
    )
}