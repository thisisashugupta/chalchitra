'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
// import { MoonIcon, SunIcon } from '@heroicons/react/solid'

interface ThemeSwitchProps {
    className?: string
}

export default function ThemeSwitch({ className = '' }: ThemeSwitchProps) {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    // if (resolvedTheme === 'dark') {
    //     return <div onClick={() => setTheme('light')}>sun</div>
    // }

    return (
        <button
            aria-label="Toggle Dark Mode"
            type="button"
            className={`w-8 h-8 p-1 rounded-md ${className}`}
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
            {resolvedTheme === 'dark' ? <Sun strokeWidth={1.5} /> : <Moon strokeWidth={1.5} />}
            {/* {theme === 'dark' ? <SunIcon /> : <MoonIcon />} */}
        </button>
    )
}