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
    
        const params = ({
            Bucket: bucketName,
            Key: video_id,
            Expires: 300 // seconds
        });

        const uploadURL = await s3.getSignedUrlPromise('putObject', params); // signed url to put an object in bucket

        return { video_id, url: uploadURL };
        
    } catch (error) {
        console.error(error);
        return { video_id: null, url: null };
    }

}

export async function POST(req : Request) {
    return new NextResponse(JSON.stringify({ message: 'Hello World!' }), { status: 200, headers: { message: 'bro kya kr raha hai? GET request kar!' } });
}

export async function GET(req : Request) {
    try {

        const { video_id, url } = await generateUploadURL();
        return new NextResponse(JSON.stringify({ video_id, url }), { status: 200 });
        
    } catch (error) {

        console.error(error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error. Failed to upload video.' }), { status: 500 });

    }
}
