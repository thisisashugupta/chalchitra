"use server"

import { Skeleton } from "@/components/ui/skeleton";

export async function VideoPlayerSkeleton() {
    return (
        <div className='md:mx-4 md:rounded-xl'>
            {/* flex flex-col items-center justify-center  */}
            <Skeleton className='w-full aspect-video' />
        </div>
    )
}

export async function VideoDetailsSkeleton() {
    return (
    <div>
        <Skeleton className='h-6 mx-4 mt-2 text-lg font-bold' />
        <Skeleton className='h-4 mt-2 mx-4 text-xs text-gray-500 w-[60vw]'/>
        <Skeleton className='h-14 mx-4 my-2 px-4 border bg-slate-200 rounded-lg' />
    </div>);
}

export default async function Loading() {
    return (<>Loading</>);
};