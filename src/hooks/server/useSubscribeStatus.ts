'use server'

import { getPrismaClient } from '@/app/providers/PrismaProvider'
const prisma = getPrismaClient()

type UseSubscribeStatusProps = {
    email?: string | null | undefined, 
    id: number | null | undefined 
}

async function useSubscribeStatus({email, id}: UseSubscribeStatusProps) {
    if (!email) return { error: 'email is required' }
    if (!id) return { error: 'video_id is required' }

    try {
        // searching of among the subscriptions of the user, if the channel/user with id is present
        const userSubscribed = await prisma.user.findUnique({
            where: { email },
            select: {
              subscriptions: {
                where: { id },
                select: { id: true }
              }
            }
        });
                
        const isUserSubscribed = userSubscribed?.subscriptions.length === 0 ? false : true;
        
        return { isUserSubscribed };
    } catch (error) {
        console.error(error);
        return { isUserSubscribed: null, error: 'error occurred while fetching subscribe status of channel'};
    }
}

export default useSubscribeStatus