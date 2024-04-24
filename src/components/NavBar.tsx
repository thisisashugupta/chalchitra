'use server'

import { getServerSession, type Session } from 'next-auth'; // to see if we have an ongoing session
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import NavClient from '@/components/NavClient';
import { getPrismaClient } from '@/app/providers/PrismaProvider';

export default async function Nav() {

    const session : Session | null = await getServerSession(authOptions);

    const email = session?.user?.email;

    const prisma = getPrismaClient();

    let user = null;

    if (email) {
        user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        console.log(user);
        
    }


    return <NavClient session={session} user={user} />;
}