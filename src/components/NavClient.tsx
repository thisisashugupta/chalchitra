'use client'

import { useState } from 'react'
import { type Session } from 'next-auth'
import Link from 'next/link'
import SheetBar from '@/components/SheetBar'
import SearchBar from '@/components/SearchBar'
import VoiceButton from '@/components/VoiceButton'
import { Button } from '@/components/ui/button'
import { MonitorPlay, Search, ArrowLeft, X } from 'lucide-react'
import ThemeSwitch from '@/components/ThemeSwitch'

export default function NavClient({session} : {session: Session | null}) {

    const [openSearch, setOpenSearch] = useState<boolean>(false);

    return (<>
        {/* web */}
        <nav className='py-2 px-6 space-x-4 hidden md:flex items-center justify-between bg-white/60 dark:bg-black/60'>
            <div className='flex'>
                <SheetBar session={session} side='left' />
                <Link className='flex gap-1 ml-2 md:ml-0 md:ml-4' href="/"><MonitorPlay />Chalchitra</Link>
            </div>
            <div className='px-16 w-[50rem] flex justify-center'>
                <div className='pl-4 w-full max-w-[40rem]'><SearchBar /></div>
                <VoiceButton />
            </div>
            <div className='pl-4 flex items-center space-x-4'>
                <ThemeSwitch />
                <Button>
                    { session ? 
                        ( <Link href="/api/auth/signout?callbackUrl=/">Logout</Link> ) : 
                        ( <Link href="/api/auth/signin">Login</Link> )
                    }
                </Button>
            </div>
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