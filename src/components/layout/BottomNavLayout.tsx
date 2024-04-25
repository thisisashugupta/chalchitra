'use client'

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
const BottomNavbar = dynamic(() => import('@/components/feature/BottomNavbar'), { ssr: false })

function SidebarLayout({children}: React.PropsWithChildren<{}>) {
    const pathname = usePathname()
    
    if (pathname === '/watch') return <div>{children}</div>

    return (
    <div>
        <div>{children}</div>
        <div className='md:hidden h-[3.06rem]'></div>
        <div className='md:hidden'><BottomNavbar pathname={pathname} /></div>
    </div>
    )
}

export default SidebarLayout
