import aws from "aws-sdk";
import { NextResponse } from "next/server";
import crypto from 'crypto';
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);

const bucketName = process.env.BUCKET_NAME!;
const bucketRegion = process.env.BUCKET_REGION!;
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
        const imageName = rawBytes.toString('hex'); // unique image name
        console.log('imageName', imageName);
    
        const params = ({
            Bucket: bucketName,
            Key: imageName,
            Expires: 60 // seconds
        });

        const uploadURL = await s3.getSignedUrlPromise('putObject', params); // signed url to put an object in bucket
        console.log('uploadURL', uploadURL);
        return uploadURL;
        
    } catch (error) {
        console.error(error);
        return null;
    }

}

export async function POST(req : Request) {
    return new NextResponse(JSON.stringify({ message: 'Hello World!' }), { status: 200, headers: { message: 'bro kya kr raha hai? GET request kar!' } });
}

export async function GET(req : Request) {
    try {

        const url = await generateUploadURL();
        return new NextResponse(JSON.stringify({ url: url }), { status: 200 });
        
    } catch (error) {

        console.error(error);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error. Failed to upload video.' }), { status: 500 });

    }
}
