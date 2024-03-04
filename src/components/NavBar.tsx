'use server'

import { getServerSession, type Session } from 'next-auth'; // to see if we have an ongoing session
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import NavClient from '@/components/NavClient';

export default async function Nav() {

    const session : Session | null = await getServerSession(authOptions);

    return <NavClient session={session} />;
}