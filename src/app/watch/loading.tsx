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
        <Skeleton className='h-5 rounded-full mt-2 w-[50%] dark:bg-neutral-600/60' />
        <Skeleton className='h-5 rounded-full mt-3 w-[25%] dark:bg-neutral-600/60' />
        <Skeleton className='h-20 rounded-xl  mt-4 w-full  dark:bg-neutral-600/60' />
        <div className='h-2 w-full' />
    </div>);
}

export async function SuggestionsSkeleton() {

const videos = Array.from({ length: 11 }, (_, i) => ({
    id: i,
    title: "title",
    name: "name",
}));

    return (
        <>
            <div className='lg:min-w-[25rem] lg:max-w-[25rem] space-y-4 mb-6 md:my-6 mx-3 md:mx-0'>
                <h2 className='text-xl font-semibold'>Suggestions</h2>
                {videos.map((video) => (
                <div key={video.id}>
                    <SuggestionsCardSkeleton />
                </div>
                ))}
            </div>
        </>
    );
}

export async function SuggestionsCardSkeleton() {
    return (
        <div className="flex gap-4">
            <Skeleton className='h-[5.625rem] aspect-video dark:bg-neutral-600/60' />
            <div className="w-full space-y-3">
                <Skeleton className='h-5 w-[100%] rounded-full dark:bg-neutral-600/60' />
                <Skeleton className='h-5 w-[50%]  rounded-full dark:bg-neutral-600/60' />    
            </div>
        </div>
    )
}

export default async function Loading() {
    return (
        <main className='flex justify-center'>
            <div className='w-full max-w-[106.5rem] md:mx-6 flex flex-col lg:flex-row gap-6 items-start justify-center'>
                <div className='w-full'>
                    <VideoPlayerSkeleton />
                    <VideoDetailsSkeleton />
                </div>
                <SuggestionsSkeleton />
            </div>
        </main>
    );
};