import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import AuthProvider from './providers/AuthProvider';
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className='w-full fixed top-0 bg-white'><NavBar /></div>
          <div className='z-10 md:fixed hidden md:block'><SideBar /></div>
          <div className='md:ml-20 mt-12 md:mt-14 bg-white'>{children}</div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
