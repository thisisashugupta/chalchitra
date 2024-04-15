"use client"

import { useState, useEffect } from 'react';
import { type User } from '@prisma/client';

type UserResponse = User | null;
// TODO: Channel to User

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
            {isLoading ? <p>{params.user_id} Loading User Page...</p> : 
                <div>
                    <h1>{userProfile?.name}</h1>
                    {/* <h2>Bio: {userProfile?.profile?.bio}</h2> */}
                    <h2>Channel: {"User Channel"}</h2>
                </div>
            }
        </div>
    );
};

export default UserProfile;
