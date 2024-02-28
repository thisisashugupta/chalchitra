// components/Sheet.tsx
"use client"

import Link from 'next/link';
import { Menu } from 'lucide-react';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
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
      <SheetTrigger><Menu /></SheetTrigger>
      <SheetContent side={side}>
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
