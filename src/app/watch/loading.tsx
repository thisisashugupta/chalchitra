"use client"

import { Skeleton } from "@/components/ui/skeleton";

export async function VideoPlayerSkeleton() {
    return (
        <div className='bg-transparent md:mx-4 md:rounded-xl overflow-hidden'>
            {/* flex flex-col items-center justify-center */}
            <div><Skeleton className='w-full aspect-video' /></div>
        </div>
    )
}

export async function VideoDetailsSkeleton() {
    return (
    <div>
        <Skeleton className='h-6 mx-4 mt-2 text-lg font-bold' />
        <Skeleton className='h-4 mt-2 mx-4 text-xs text-gray-500 w-[70%]'/>
        <Skeleton className='h-14 mx-4 my-2 px-4 border bg-slate-200 rounded-lg' />
    </div>);
}

export default async function Loading() {
    return (
        <main className='flex flex-col items-center justify-center'>
            <div className='w-full max-w-5xl'>
                <VideoPlayerSkeleton />
                <VideoDetailsSkeleton />
            </div>
        </main>
    );
};