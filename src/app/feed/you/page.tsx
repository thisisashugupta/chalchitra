'use server'

import { getPrismaClient } from "@/app/providers/PrismaProvider"
import UserCard from "./UserCard"
import VideoShowcase from "./VideoShowcase"
import PlaylistShowcase from "./PlaylistShowcase"
import useServerAuth from "@/hooks/server/useServerAuth"

async function YouPage() {

    const { isAuthenticated, user } = await useServerAuth()
    if (!isAuthenticated) return (<>Not Logged In</>)
    
    const prisma = getPrismaClient()

    const userData = await prisma.user.findUnique({
        where: {
            email: user?.email!
        },
        include: {
            videos: {
                take: 10
            },
            liked_videos: {
                take: 10
            },
            playlists: {
                take: 10
            }
            // history: { take: 10 },
            // watch_later: { take: 10 },
        }
    })

    console.log('playlists', userData?.playlists)

    if (!userData) throw new Error('Error Fetching User Data')

    return (
        <div className="m-4 flex justify-center">
            <div className='max-w-7xl w-full'>
                <UserCard userData={userData} />
                <VideoShowcase title="Some Uploads" videos={userData.videos} href="/uploads" />
                {/* <VideoShowcase title="Liked videos" videos={userData.liked_videos} /> */}
                {/* TODO: Liked VIdeos is a playlist */}
                <PlaylistShowcase playlists={userData.playlists} />
                
                
            </div>
        </div>
    );
}

export default YouPage