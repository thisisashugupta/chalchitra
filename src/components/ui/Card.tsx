import React from 'react';

export default function Card({title, author}: {title: string, author: string}) {

    return (
        <div className="flex w-full items-center justify-center m-2">
            <div className='flex flex-col space-y-2'>
                <img src='https://picsum.photos/200' className="rounded-lg w-48 h-24" />
                <div className='font-bold text-lg'>{title}</div>
                <div>{author}</div>
            </div>
        </div>
    )

}