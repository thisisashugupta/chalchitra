// components/Sheet.tsx
"use client"

import Link from 'next/link';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
  } from "@/components/ui/sheet";

  // TODO: typeof session is any
const SheetBar = ({session}:{session:any}) => {

  return (
    <Sheet>
      <SheetTrigger className='text-white text-sm bg-black px-3 py-1 border border-black rounded'>ham</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetDescription>Pages</SheetDescription>
          <SheetTitle><Link href="/uploads"><SheetClose>Uploads</SheetClose></Link></SheetTitle>
          <SheetTitle><Link href="/upload"><SheetClose>Create</SheetClose></Link></SheetTitle>
          <SheetTitle>
            {session ? (
                <Link href="/api/auth/signout?callbackUrl=/"><SheetClose>Logout</SheetClose></Link>
                ) : (
                <Link href="/api/auth/signin"><SheetClose>Login</SheetClose></Link>
            )}
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>

  );
};

export default SheetBar;