'use client'

import { useState } from 'react'
import { type Session } from 'next-auth'
import Link from 'next/link'
import SheetBar from '@/components/SheetBar'
import SearchBar from '@/components/SearchBar'
import VoiceButton from '@/components/ui/buttons/VoiceButton'
import SignIn from '@/components/ui/buttons/SignIn'
import CreateVideo from '@/components/ui/buttons/CreateVideo'
import { MonitorPlay, Search, X } from 'lucide-react'
import ThemeSwitch from '@/components/ThemeSwitch'
import { User } from '@prisma/client'

export default function NavClient({session, user} : {session: Session | null, user: User | null}) {

    const [openSearch, setOpenSearch] = useState<boolean>(false);

    return (<>
        {/* web */}
        <nav className='py-2 px-6 space-x-4 hidden md:flex items-center justify-between bg-white/60 dark:bg-black/60 backdrop-blur-lg'>
            <div className='flex'>
                <SheetBar session={session} side='left' />
                <Link className='flex gap-1 ml-2 md:ml-0 md:ml-4' href="/"><MonitorPlay strokeWidth={1.5} />Chalchitra</Link>
            </div>
            <div className='px-16 w-[50rem] flex justify-center'>
                <div className='pl-4 w-full max-w-[40rem]'><SearchBar /></div>
                <div className='ml-4'><VoiceButton /></div>
            </div>
            <div className='pl-4 flex items-center space-x-4'>
                <div className='flex justify-center items-center min-w-max space-x-2'>
                    <Link href={'/upload'}><CreateVideo /></Link>
                    <div><ThemeSwitch /></div>
                    <div className='px-1 min-w-max'>
                    { session ? 
                        // TODO: open hover card on click
                        <img 
                            src={ user?.photo || 'https://picsum.photos/200'} 
                            className="w-9 h-9 rounded-full"
                        /> :
                        <Link href="/api/auth/signin"><SignIn /></Link>
                    }
                    </div>
                </div>
            </div>
        </nav>

        {/* mobile */}
        <nav className='md:hidden flex items-center justify-between space-x-4 px-3 py-[0.3rem] bg-white/60 dark:bg-black/60 backdrop-blur-lg'>

            {/* <SheetBar session={session} side='left' /> */}
            {!openSearch && <Link className='flex gap-1 p-2' href="/"><MonitorPlay strokeWidth={1.5} />Chalchitra</Link>}
            {!openSearch && 
            <div className='min-w-max flex items-center'>
                <button className='flex mr-6' onClick={() => setOpenSearch(true)}><Search/></button>
                <img className="w-7 h-7 rounded-full" src={ user?.photo || 'https://picsum.photos/200'} />
            </div>
            }
            {openSearch && <SearchBar setOpenSearch={setOpenSearch} />}
            {openSearch && <button onClick={() => setOpenSearch(false)}><X /></button>}
            
        </nav>
    </>);

}