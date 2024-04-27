'use client'

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
const BottomBar = dynamic(() => import('@/components/layout/BottomBar'), { ssr: false })
const SideBar = dynamic(() => import('@/components/layout/SideBar'), { ssr: false })

export default function SecondaryNavLayout({children}: React.PropsWithChildren<{}>) {
    const pathname = usePathname()
    if (pathname === '/watch') 
        return <div>{children}</div>

    return (<>
        {/* web */}
        <nav className='hidden md:block'>
            <div className='grid grid-cols-1'>
                <div className='z-10 fixed'><SideBar /></div>
                <div className='md:ml-20'>{children}</div>
            </div>
        </nav>

        {/* mobile */}
        <nav className='block md:hidden'>
            <div>{children}</div>
            <div className='h-[3.06rem]'></div>
            <div><BottomBar pathname={pathname} /></div>
        </nav>
    </>)
}
