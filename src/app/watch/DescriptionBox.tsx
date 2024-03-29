"use client"
import React, { useState } from 'react';

export default function DescriptionBox({description, elapsedTime}: {description?: string, elapsedTime: string }) {

    const [open, setOpen] = useState(false);

    return (<>
    {!open && <button className="text-start mt-3 p-3 w-full rounded-xl bg-gray-100 dark:bg-gray-800/90 focus:bg-gray-300 dark:focus:bg-gray-600/70" onClick={() => setOpen(true)}>
        <div className="text-0.5xs font-semibold space-x-2">
            <span className="">80K views</span>
            <span>{elapsedTime}</span>
        </div>
        <div className="text-sm line-clamp-2 whitespace-pre-line">
            <p>{description}</p>

        </div>
        <span className='text-sm font-semibold' >{"...more"}</span>
    </button>}

    {open && <div className="text-start mt-3 p-3 w-full rounded-xl bg-gray-100 dark:bg-gray-800/90">
        <div className="text-0.5xs font-semibold space-x-2">
            <span>80,000 views</span>
            <span>{"16 May 2021"}</span>
        </div>
        <div className="text-sm whitespace-pre-line">
            <p>{description}</p>
        </div>
        <button className='text-sm font-semibold' onClick={() => setOpen(false)}>Show less</button>
    </div>}
        
    </>
    );

}