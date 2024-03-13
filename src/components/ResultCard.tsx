import React from 'react';
import ResultDetails from '@/components/ResultDetails';
import Link from 'next/link';
import Thumbnail from './ui/Thumbnail';

// const time = 3;
const views = 33;

interface ResultCardProps {
    title: string;
    author: string;
    thumbnailUrl: string;
    video_id: string;
}

export default function ResultsCard({title, author, thumbnailUrl, video_id}: ResultCardProps) {

    return (
        <div className='flex gap-4'>
            <div className='min-w-60 max-w-60 md:min-w-80 md:max-w-80'>
            <Link href={`/watch/?v=${video_id}`}>
                <Thumbnail thumbnailUrl={thumbnailUrl} rounded='xl' />
            </Link>
            </div>
            <Link className='w-full' href={`/watch/?v=${video_id}`} passHref legacyBehavior >
                <ResultDetails title={title} views={views} uploadedAt={"3 weeks"} description="asdfa asdf asd f" authorImage="asdfas" author={author} />
            </Link>
            
        </div>
    );

}