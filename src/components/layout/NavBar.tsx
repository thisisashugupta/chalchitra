'use server'

import useUserData from '@/hooks/server/useUserData'
import useServerAuth from '@/hooks/server/useServerAuth'
import NavClient from '@/components/layout/NavClient'

export default async function Nav() {

    const { session } = await useServerAuth()
    const { user } = await useUserData()

    return <NavClient session={session} user={user} />
}