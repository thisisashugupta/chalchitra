'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"

export default function RequireLogin() {

    const { status } = useSession()
    
    const [isAuthenticated, _] = useState(status === "authenticated")

    return { isAuthenticated } 
    // returns true if user is authenticated and false otherwise
}