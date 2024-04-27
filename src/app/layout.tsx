// layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from './providers/AuthProvider'
import { ThemeModeProvider } from '@/app/providers/ThemeProvider'
import RecoilProvider from '@/app/providers/RecoilProvider'
import { Toaster } from "@/components/ui/toaster"
import NavBar from '@/components/layout/NavBar'
import SecondaryNavLayout from '@/components/layout/SecondaryNavLayout'
import UserData from '@/components/layout/UserData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chalchitra',
  description: 'A video sharing platform for the Indian masses.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeModeProvider>
          <AuthProvider>
            <RecoilProvider>
              <UserData />
              <div className='z-10 w-full fixed top-0'><NavBar /></div>
              <div className='h-12 md:h-14' />
                <SecondaryNavLayout>
                  {children}
                </SecondaryNavLayout>
            </RecoilProvider>
          </AuthProvider>
        </ThemeModeProvider>
        <Toaster />
      </body>
    </html>
  )
}
