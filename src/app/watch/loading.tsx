"use server"

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

export async function SuggestionsSkeleton() {
    return (
        <>
            <div className='lg:max-w-[25rem] space-y-4 mb-6 md:my-6 mx-3 md:mx-0'>
                <h2 className='text-xl font-semibold'>Suggestions</h2>
                {Array(5).map((_, index) => <div key={index}><SuggestionsCardSkeleton /></div>
                )}
            </div>
        </>
    );
}

export async function SuggestionsCardSkeleton() {
    return (
        <>
        
        <div className='flex gap-4'>

            <div className='w-full min-w-[160px] max-w-[160px] select-none'>
                <Skeleton className="aspect-video rounded-xl" />
            </div>

            <div className='w-full flex flex-col cursor-pointer'>
                <div className='flex justify-between space-x-2 text-md font-medium'>
                    <Skeleton className="h-3" />
                    <Skeleton className="h-3" />
                </div>
                <Skeleton className="h-3" />
                <Skeleton className="h-3" />
            </div>
        </div>
    
        </>
    )
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