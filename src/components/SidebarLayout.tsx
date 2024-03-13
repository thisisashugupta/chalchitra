'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import SideBar from '@/components/SideBar';

function SidebarLayout({children}: React.PropsWithChildren<{}>) {
    const pathname = usePathname()
    if (pathname === '/watch')
        return <div className='mt-12 md:mt-14'>{children}</div>;

    return (
    <div className='grid grid-cols-1'>
        <div className='mt-14 z-10 md:fixed hidden md:block'><SideBar /></div>
        <div className='md:ml-20 mt-12 md:mt-14'>{children}</div>
    </div>
    )
}

export default SidebarLayout
