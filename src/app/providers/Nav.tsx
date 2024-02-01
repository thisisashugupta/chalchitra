import Link from 'next/link';
import { getServerSession } from 'next-auth'; // to see if we have an ongoing session
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import SheetBar from '@/app/providers/SheetBar';

export default async function Nav() {

    const session = await getServerSession(authOptions);

    return (
    <nav className='flex justify-between px-10 py-4 space-x-4'>
        <Link href="/">Chalchitra</Link>
        <div className='hidden md:block space-x-4'>
            <Link href="/uploads">Uploads</Link>
            <Link href="/upload">Create</Link>
        </div>
        {/* <div className='hidden md:block'>{session?.user?.name}</div> */}
        <div className='hidden md:block'>
            { session ? 
                ( <Link href="/api/auth/signout?callbackUrl=/">Logout</Link> ) : 
                ( <Link href="/api/auth/signin">Login</Link> )
            }
        </div>
        {/*TODO: can use redux/recoil here */}
        <div className='md:hidden'><SheetBar session={session} /></div>
    </nav>
    );
}