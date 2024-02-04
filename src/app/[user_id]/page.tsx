"use client"

import { useState, useEffect } from 'react';
import { User, Profile } from '@prisma/client';

type UserProfileResponse = (User & { profile: Profile | null }) | null;


const UserProfile = ({params}:{params: {user_id: string}}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userProfile, setUserProfile] = useState<UserProfileResponse>();

    useEffect(() => {

        async function getUserProfile() {
            const response = await fetch(`/api/profile?user_id=${params.user_id}`, {
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
        
    }, []);

    return (
        <div>
            {isLoading ? <p>Loading...</p> : 
                <div>
                    <h1>{userProfile?.name}</h1>
                    <h2>Bio: {userProfile?.profile?.bio}</h2>
                </div>
            }
        </div>
    );
};

export default UserProfile;
