"use client"

import { useState, useEffect } from 'react';
import { User, Channel } from '@prisma/client';

type UserResponse = (User & { ownChannel: Channel | null }) | null;


const UserProfile = ({params}:{params: {user_id: string}}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userProfile, setUserProfile] = useState<UserResponse>();

    useEffect(() => {

        async function getUserProfile() {
            const response = await fetch(`/api/channel?user_id=${params.user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                // Handle error cases, e.g., show an error message
                console.error('Error fetching user profile:', response.status, response.statusText);
                return;
            }

            const userProfile = await response.json();
            setUserProfile(userProfile);
            setIsLoading(false);
        }
        getUserProfile();
        
    }, [params.user_id]);

    return (
        <div>
            {isLoading ? <p>Loading User Page...</p> : 
                <div>
                    <h1>{userProfile?.name}</h1>
                    {/* <h2>Bio: {userProfile?.profile?.bio}</h2> */}
                    <h2>Channel: {userProfile?.ownChannel?.name}</h2>
                </div>
            }
        </div>
    );
};

export default UserProfile;
