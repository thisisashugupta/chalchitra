'use client'

import { useState } from 'react'
import { type Session } from 'next-auth'
import Link from 'next/link'
import SheetBar from '@/components/SheetBar'
import SearchBar from '@/components/SearchBar'
import { MonitorPlay, Search, ArrowLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button';

export default function NavClient({session} : {session: Session | null}) {

    const [openSearch, setOpenSearch] = useState<boolean>(false);

    return (<>
        {/* web */}
        <nav className='hidden md:flex items-center justify-between space-x-4 py-2 px-6'>
            <div className='flex'>
                <SheetBar session={session} side='left' />
                <Link className='flex gap-1 ml-2 md:ml-0 md:ml-4' href="/"><MonitorPlay />Chalchitra</Link>
            </div>
            <SearchBar />
            <Button>
                { session ? 
                    ( <Link href="/api/auth/signout?callbackUrl=/">Logout</Link> ) : 
                    ( <Link href="/api/auth/signin">Login</Link> )
                }
            </Button>
        </nav>

        {/* mobile */}
        <nav className='md:hidden flex items-center justify-between space-x-4 px-6 py-[0.3rem]'>

            <SheetBar session={session} side='left' />
            {!openSearch && <Link className='flex gap-1 p-2' href="/"><MonitorPlay />Chalchitra</Link>}
            {!openSearch && <button className='flex' onClick={() => setOpenSearch(true)}><Search/></button>}
            {openSearch && <SearchBar setOpenSearch={setOpenSearch} />}
            {openSearch && <button onClick={() => setOpenSearch(false)}><X /></button>}
            
        </nav>
    </>);

}