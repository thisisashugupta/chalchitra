'use client'

import { useState } from 'react'
import { type Session } from 'next-auth'
import Link from 'next/link'
import SheetBar from '@/components/SheetBar'
import SearchBar from '@/components/SearchBar'
import VoiceButton from '@/components/VoiceButton'
import { CircleUserRound } from 'lucide-react'
import { MonitorPlay, Search, X } from 'lucide-react'
import ThemeSwitch from '@/components/ThemeSwitch'
import { User } from '@prisma/client'

export default function NavClient({session, user} : {session: Session | null, user: User | null}) {

    const [openSearch, setOpenSearch] = useState<boolean>(false);

    return (<>
        {/* web */}
        <nav className='py-2 px-6 space-x-4 hidden md:flex items-center justify-between bg-white/60 dark:bg-black/60'>
            <div className='flex'>
                <SheetBar session={session} side='left' />
                <Link className='flex gap-1 ml-2 md:ml-0 md:ml-4' href="/"><MonitorPlay strokeWidth={1.5} />Chalchitra</Link>
            </div>
            <div className='px-16 w-[50rem] flex justify-center'>
                <div className='pl-4 w-full max-w-[40rem]'><SearchBar /></div>
                <VoiceButton />
            </div>
            <div className='pl-4 flex items-center space-x-4'>
                <div className='flex items-center min-w-max'>
                    <ThemeSwitch />
                    { session ? 
                        <img
                            src={ user?.photo || 'https://picsum.photos/200'} 
                            className="m-2 w-9 h-9 rounded-full"
                        /> :
                        <div className='ml-2'>
                            <Link href="/api/auth/signin">
                                {/* Sign In Button */}
                                <div className='px-[0.6rem] py-[0.3rem] flex text-blue-500 text-sm border border-gray-700 rounded-full hover:bg-blue-400/50'>
                                    <CircleUserRound strokeWidth={1} />
                                    <p className='mx-1 font-semibold'>Sign in</p>
                                </div>
                            </Link>
                        </div>
                    }
                    

                </div>
            </div>
        </nav>

        {/* mobile */}
        <nav className='md:hidden flex items-center justify-between space-x-4 px-6 py-[0.3rem] bg-white/60 dark:bg-black/60'>

            <SheetBar session={session} side='left' />
            {!openSearch && <Link className='flex gap-1 p-2' href="/"><MonitorPlay strokeWidth={1.5} />Chalchitra</Link>}
            {!openSearch && <button className='flex' onClick={() => setOpenSearch(true)}><Search/></button>}
            {openSearch && <SearchBar setOpenSearch={setOpenSearch} />}
            {openSearch && <button onClick={() => setOpenSearch(false)}><X /></button>}
            
        </nav>
    </>);

}