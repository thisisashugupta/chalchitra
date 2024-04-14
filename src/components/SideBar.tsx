'use client'

import React from 'react';
import Link from 'next/link';
import { Home, Disc, Download, CircleUserRound, GalleryVerticalEnd, Play } from 'lucide-react';
import Icon from '@/components/SidebarButtonIcon';
import { usePathname } from 'next/navigation'


export default function SideBar() {
    const pathname = usePathname()

    if (pathname === '/watch') return null;

    return (<div>

        <div className='ml-1 w-min flex flex-col'>
            <Link href='/'>
                <Icon>
                    <Home size={22} strokeWidth={1} />
                    <p>Home</p>
                </Icon>
            </Link>
            <Link href='/feed/subscriptions'>
                <Icon>
                    <div className='relative'>
                        <GalleryVerticalEnd size={22} strokeWidth={1} />
                        <Play className="absolute top-[0.68rem] left-[0.48rem]" size={7.5} strokeWidth={2.3} />
                    </div>
                    <p>Subscriptions</p>
                </Icon>
            </Link>
            <Link href='/test'>
                <Icon>
                    <Disc size={22} strokeWidth={1} />
                    <p>Music</p>
                </Icon>
            </Link>
            <Link href='/feed/downloads'>
                <Icon>
                    <Download size={22} strokeWidth={1} />
                    <p>Downloads</p>
                </Icon>
            </Link>
            <Link href='/feed/you'>
                <Icon>
                    <CircleUserRound size={22} strokeWidth={1} />
                    <p>You</p>
                </Icon>
            </Link>
        </div>

    </div>);

}