import React from 'react';
import ResultDetails from '@/components/ResultDetails';

// const time = 3;
const views = 33;

interface ResultCardProps {
    title: string;
    author: string;
    thumbnailUrl?: string;
}

export default function ResultsCard({title, author, thumbnailUrl}: ResultCardProps) {

    return (
        <div className='flex gap-4'>
            <img className="w-60 sm:w-72 md:w-80 aspect-video rounded-xl" src={thumbnailUrl} />
            <ResultDetails title={title} views={views} uploadedAt={"3 weeks"} description="asdfa asdf asd f" authorImage="asdfas" author={author} />
        </div>
    );

}