'use client'

import useAuth from '@/hooks/useAuth'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/store/atoms/user'

export default function useUserData() {

    const setUser = useSetRecoilState(userAtom)

    const { session } = useAuth()
    const email = session?.user?.email
    
    email && fetch(`/api/user?email=${email}`)
    .then(res => res.json())
    .then(data => setUser(data))
}