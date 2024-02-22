import aws from "aws-sdk";
import { NextResponse } from "next/server";
import crypto from 'crypto';
import { promisify } from "util";
import { bucketName, bucketRegion } from "@/app/providers/S3Provider";
const randomBytes = promisify(crypto.randomBytes);

const accessKeyId = process.env.SIGNED_ACCESS_KEY!;
const secretAccessKey = process.env.SIGNED_SECRET_ACCESS_KEY!;

const s3 = new aws.S3({
    region: bucketRegion,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    signatureVersion: 'v4',
});

async function generateUploadURL() {
    try {
        const rawBytes = await randomBytes(16); // buffer        
        const video_id = rawBytes.toString('hex'); // unique video_id

        const rawBytes2 = await randomBytes(16);
        const thumbnail_id = rawBytes2.toString('hex'); // unique thumbnail_id
    
        const videoParams = ({
            Bucket: bucketName,
            Key: `videos/${video_id}`,
            Expires: 300 // seconds
        });

        const thumbnailParams = ({
            Bucket: bucketName,
            Key: `thumbnails/${thumbnail_id}`,
            Expires: 300 // seconds
        });

        const videoUploadURL = await s3.getSignedUrlPromise('putObject', videoParams);  // signed url to put an object in bucket
        const thumbnailUploadURL = await s3.getSignedUrlPromise('putObject', thumbnailParams);

        return { video_id, videoUrl: videoUploadURL, thumbnail_id, thumbnailUrl: thumbnailUploadURL};
        
    } catch (error) {
        console.error(error);
        return { video_id: null, videoUrl: null, thumbnail_id: null, thumbnailUrl: null};
    }

}

export async function POST(req : Request) {
    return new NextResponse(JSON.stringify({ message: 'Hello World!' }), { status: 200, headers: { message: 'bro kya kr raha hai? GET request kar!' } });
}

export async function GET(req : Request) {
    try {

        const { video_id, videoUrl, thumbnail_id, thumbnailUrl } = await generateUploadURL();
        return new NextResponse(JSON.stringify({ video_id, videoUrl, thumbnail_id, thumbnailUrl }), { status: 200 });
        
    } catch (error) {

        console.error(error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error. Failed to upload video.' }), { status: 500 });

    }
}
