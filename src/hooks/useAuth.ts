'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"

export default function RequireLogin() {

    const { status, data } = useSession()
    
    const [isAuthenticated, _] = useState(status === "authenticated")

    return { isAuthenticated, session: data } 
    // returns true if user is authenticated and false otherwise
}