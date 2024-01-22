'use client'

import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

const ClientPage = () => {

    const { data : session } = useSession({
        required: true,
        onUnauthenticated: () => {
            redirect('/api/auth/signin?callbackUrl=/client');
        }
    });
    if(!session) 
    return (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      );

    return (
        <div>
            <h1>Client Page</h1>
            <p>User email: {session?.user?.email}</p>
        </div>
    );
}

export default ClientPage;