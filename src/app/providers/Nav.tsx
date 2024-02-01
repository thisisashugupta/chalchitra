import Link from 'next/link';
import { getServerSession } from 'next-auth'; // to see if we have an ongoing session
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function Nav() {

    const session = await getServerSession(authOptions);

    return (
    <nav className='flex justify-between px-10 py-4 space-x-4'>
        <Link href="/">Chalchitra</Link>
        <div className='space-x-4'>
            <Link href="/uploads">Uploads</Link>
            <Link href="/upload">Create</Link>
            
            {/* <Link href="/api/auth/signout">Sign out</Link> */}
            {session ? (
                <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
            ) : (
                <Link href="/api/auth/signin">Login</Link>
            )
            }
        </div>
        <div>{session?.user?.name}</div>
    </nav>
    );
}