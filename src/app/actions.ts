'use server'

import crypto from 'crypto';
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client, { bucketName, bucketRegion } from "@/app/providers/S3Provider"
import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();
// import { Video } from '@prisma/client'

export async function mutateVideoServerAction(id: number, thumbnail_id: string, formData: FormData) {

    try {

        let key = `thumbnails/${thumbnail_id}`;
        let th_id = thumbnail_id;

        if (thumbnail_id === '' || thumbnail_id === undefined || thumbnail_id === null) {
            // create a new thumbnail_id
            const rawBytes2 = await randomBytes(16);
            const new_thumbnail_id = rawBytes2.toString('hex'); // unique thumbnail_id
            key = `thumbnails/${new_thumbnail_id}`;
            th_id = new_thumbnail_id;
        }
        
        const rawFormData = {
            title: formData.get('title'),
            content: formData.get('content'),
            published: formData.get('published') === 'on',
        }
        const thumbnailFile = formData.get('thumbnail') as File;

        if (thumbnailFile.size > 0) {

            const buffer = Buffer.from(await thumbnailFile.arrayBuffer());

            const uploadParams = {
                Bucket: bucketName,
                Key: key, // filename
                Body: buffer, // actual file
                ContentType: thumbnailFile.type, // type of file
                // ACL: "public-read",
            };

            const command = new PutObjectCommand(uploadParams);
            await s3Client.send(command);

        }

        await prisma.video.update({
            where: {
                id: id as number
            },
            data: {
                title: rawFormData.title as string,
                content: rawFormData.content as string,
                published: rawFormData.published as boolean,
                thumbnail_id: th_id as string
            }
        });

    } catch (error) {
        console.error(error);
    } finally {
        await cleanup();
    }
    
}