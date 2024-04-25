import Link from 'next/link'
import Icon from '@/components/ui/BottomNavButtonIcon'
import { Home, Disc, CircleUserRound, GalleryVerticalEnd, Play } from 'lucide-react'

export default function SideBar({pathname}: {pathname: string}) {

    return (
        <div className='fixed left-0 right-0 bottom-0 min-w-max bg-white dark:bg-black grid grid-cols-4'>
            <Link href='/' className={pathname ==='/' ? "bg-blue-500" : ""}>
                <Icon>
                    <Home size={22} strokeWidth={1} />
                    <p>Home</p>
                </Icon>
            </Link>

            <Link href='https://music.youtube.com' target='_blank'>
                <Icon>
                    <Disc size={22} strokeWidth={1} />
                    <p>Music</p>
                </Icon>
            </Link>

            <Link href='/feed/subscriptions' className={pathname ==='/feed/subscriptions' ? "bg-blue-500" : ""}>
                <Icon>
                    <div className='relative'>
                        <GalleryVerticalEnd size={22} strokeWidth={1} />
                        <Play className="absolute top-[0.68rem] left-[0.48rem]" size={7.5} strokeWidth={2.3} />
                    </div>
                    <p>Subscriptions</p>
                </Icon>
            </Link>

            <Link href='/feed/you' className={pathname ==='/feed/you' ? "bg-blue-500" : ""}>
                <Icon>
                    <CircleUserRound size={22} strokeWidth={1} />
                    <p>You</p>
                </Icon>
            </Link>
        </div>
    )
}