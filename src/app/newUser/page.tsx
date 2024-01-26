import React from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'
const prisma = new PrismaClient();

async function InputWithLabel() {

  // Server Action
  
    async function addUser(e: FormData) {
        'use server';

        const session = await getServerSession(authOptions);
        console.log(session?.user?.email);

        const email = session?.user?.email;
        const name = e.get('name')?.toString();

        if (!email || !name) return;

        try {
            const newUser = await prisma.user.create({
                data: { name, email }
            });
        } catch (error) {
            console.error(error);
        } finally {
            prisma.$disconnect();
        }
        
    }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
        <form action={addUser}>
            <Label htmlFor="name">Name</Label>
            <Input name='name' type="name" id="name" placeholder="Name" />
            <Button type='submit'>Add</Button>
        </form>
    </div>
  )
}

export default function CreateUserPage () {
  return (
  <div>
    <h1>Create User Page</h1>
    <InputWithLabel />
  </div>
  );
}