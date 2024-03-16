// components/Sheet.tsx
"use client"

import Link from 'next/link';
import { Menu } from 'lucide-react';
import ThemeSwitch from '@/components/ThemeSwitch';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetTrigger,
    SheetClose,
  } from "@/components/ui/sheet";

  type SheetBarProps = {
    session: any,
    side: "top" | "bottom" | "left" | "right" | null | undefined
  }

  // TODO: typeof session is any
const SheetBar = ({session, side}: SheetBarProps) => {

  return (
    <Sheet>
      <SheetTrigger><Menu strokeWidth={1} size={26} /></SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetDescription>Pages</SheetDescription>
          <SheetTitle><Link href="/uploads"><SheetClose>Your Uploads</SheetClose></Link></SheetTitle>
          <SheetTitle><Link href="/upload"><SheetClose>Upload Video</SheetClose></Link></SheetTitle>
          <SheetTitle>
            {session ? (
                <Link href="/api/auth/signout?callbackUrl=/"><SheetClose>Logout</SheetClose></Link>
                ) : (
                <Link href="/api/auth/signin"><SheetClose>Login</SheetClose></Link>
            )}
          </SheetTitle>
        </SheetHeader>
        <SheetFooter>
          <SheetClose>
            <ThemeSwitch className='md:hidden m-4' />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>

  );
};

export default SheetBar;
