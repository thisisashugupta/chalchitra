import React from "react";

export default function Icon({children}: React.PropsWithChildren<{}>) {
    return (
        <div className='w-full w-20 flex flex-col items-center gap-2 py-4 px-1 text-2xs hover:bg-gray-300/50 dark:hover:bg-gray-500/50 hover:rounded-xl'>
            {children}
        </div>
    );
}