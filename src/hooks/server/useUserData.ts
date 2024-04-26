'use server'

import useServerAuth from '@/hooks/server/useServerAuth'
import { getPrismaClient } from '@/app/providers/PrismaProvider'

export default async function Nav() {

    const { isAuthenticated, user } = await useServerAuth()

    const prisma = getPrismaClient()

    let userData = null

    if (user?.email) {
        userData = await prisma.user.findUnique({
            where: {
                email: user?.email
            }
        })
    }

    return { isAuthenticated, user: userData }
}