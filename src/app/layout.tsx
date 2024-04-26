// layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from './providers/AuthProvider'
import { ThemeModeProvider } from '@/app/providers/ThemeProvider'
import RecoilProvider from '@/app/providers/RecoilProvider'
import { Toaster } from "@/components/ui/toaster"
import NavBar from '@/components/layout/NavBar'
import SidebarLayout from '@/components/layout/SidebarLayout'
import BottomNavLayout from '@/components/layout/BottomNavLayout'

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
              <div className='z-10 w-full fixed top-0'><NavBar /></div>
              <SidebarLayout>
                <BottomNavLayout>
                  {children}
                </BottomNavLayout>
              </SidebarLayout>
              {/* <div className='z-10 md:fixed hidden md:block'><SideBar /></div> */}
              {/* <div className='md:ml-20 mt-12 md:mt-14'>{children}</div> */}
            </RecoilProvider>
          </AuthProvider>
        </ThemeModeProvider>
        <Toaster />
      </body>
    </html>
  )
}
