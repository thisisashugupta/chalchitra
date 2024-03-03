import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function ResultDetailsSkeleton() {
    return (
        <div>
    
            <div className='flex justify-between space-x-2'>
                <Skeleton className='h-6 w-full' />
                <Skeleton className='w-6 h-6' />
            </div>

            <Skeleton className='mt-2 w-32 h-4' />

            <div className='flex items-center py-3 space-x-2'>
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className='w-24 h-4' />
            </div>

            <Skeleton className='mt-2 h-4 w-96'/>
            <Skeleton className='mt-2 h-4 w-96'/>
        </div>
    );
}

export function ResultsCardSkeleton() {

    return (
        <div className='flex gap-4'>
            <div className='min-w-60 max-w-60 md:min-w-80 md:max-w-80'>
                <Skeleton className="aspect-video rounded-xl" />
            </div>
            <div className='w-full' >
                <ResultDetailsSkeleton />
            </div>

        </div>
    );

}

const VideoListSkeleton = () => {

    const videos =[{},{},{},{},{}]

    return (
        <main className='mx-8'>
        <div className='max-w-6xl mx-auto'>
                <>
                <h2 className='py-3 text-2xl font-semibold'>Results</h2>
                    <div className='space-y-4'>
                        {videos.map(() => (
                        <div key={Math.random()}>
                            <ResultsCardSkeleton />
                        </div>
                        ))}
                    </div>
                </>
        </div>
        </main>
    );
};

export default VideoListSkeleton;