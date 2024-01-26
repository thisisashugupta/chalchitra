import React from 'react';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

const ServerPage = async () => {
    const session = await getServerSession(authOptions);
    if(!session) {
        redirect('/api/auth/signin?callbackUrl=/server');
    }
    return (
        <div>
            <h1>Server Page</h1>
            <p>{session?.user?.email}</p>
        </div>
    );
}

export default ServerPage;