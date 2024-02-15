'use server'

import { prisma } from "@/app/providers/PrismaProvider"
// import { Video } from '@prisma/client'

export async function mutateVideoServerAction(id: number, formData: FormData) {

    try {

        const rawFormData = {
            title: formData.get('title'),
            content: formData.get('content'),
            published: formData.get('published') === 'on',
            // playlistId: formData.get('playlistId')
        }

        // console.log('server action', rawFormData, id);

        // const updateResponse = 
        await prisma.video.update({
            where: {
                id: id as number
            },
            data: {
                title: rawFormData.title as string,
                content: rawFormData.content as string,
                published: rawFormData.published as boolean
            }
        });

        // console.log('updateResponse', updateResponse);

    } catch (error) {
        console.error(error);
    }
    
}