'use client'

import { MoreVertical } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

export default function VideoCardSkeleton() {

    return (
        
        <div className='flex flex-col gap-1'>
            <Skeleton className="w-full aspect-video md:rounded-xl" />
            <div className='flex w-full justify-between pl-2'>
                {/* <div><Skeleton className="mt-2 mr-3 w-9 h-9 rounded-full w-10 h-10" /></div> */}
                
                <div className='flex flex-col w-full'>
                    <div className='mt-2 text-xs text-gray-500'>
                      <Skeleton className='w-full h-4' />
                      <div className='pr-8'><Skeleton className='w-full h-3 mt-2' /></div>
                    </div>
                </div>
                
                <div>
                    <div className='mt-2 ml-3 w-10 h-10 text-center p-2 rounded-full font-bold hover:bg-gray-300'><MoreVertical /></div>
                </div>
            </div>
        </div>
    )
}