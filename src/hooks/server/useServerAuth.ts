'use server'

import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

export default async function useServerAuth() {

    const session = await getServerSession(authOptions)
    return { 
        isAuthenticated: Boolean(session), 
        user: session?.user 
    }
}