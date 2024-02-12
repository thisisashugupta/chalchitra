import Link from 'next/link';
import { getServerSession } from 'next-auth'; // to see if we have an ongoing session
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import SheetBar from '@/app/providers/SheetBar';
import { MonitorPlay } from 'lucide-react';
import { Button } from '@/components/ui/button'

export default async function Nav() {

    const session = await getServerSession(authOptions);

    return (
    <nav className='flex items-center justify-between py-3 md:py-4 px-4 space-x-4'>
        <Link className='flex gap-1' href="/"><MonitorPlay />Chalchitra</Link>

        <div className='hidden md:block space-x-4'>
            <Link href="/uploads">Uploads</Link>
            <Link href="/upload">Create</Link>
        </div>
        
        <div className='hidden md:block'>
        <Button>
            { session ? 
                ( <Link href="/api/auth/signout?callbackUrl=/">Logout</Link> ) : 
                ( <Link href="/api/auth/signin">Login</Link> )
            }
        </Button>
        </div>
        {/*TODO: can use redux/recoil here */}
        <div className='md:hidden'><SheetBar session={session} /></div>
    </nav>
    );
}