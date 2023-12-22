import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const bucketName = process.env.BUCKET_NAME!;
const bucketRegion = process.env.BUCKET_REGION!;
const accessKey = process.env.ACCESS_KEY!;
const secretAccessKey = process.env.SECRET_ACCESS_KEY!;

const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});


async function uploadFileToS3(file: Buffer, fileName: string) {

    const fileBuffer = file;
    console.log(fileName);
    
}

export async function GET(req : Request, res : Response) {
    return new Response('Hello World!', {
        status: 200,
        headers: { message: 'message not found' },
    });
}

export async function POST(req : Request, res : Response) {
    try {
        const formData = await req.formData();
        const file = formData.get('image');
        const caption = formData.get('caption');
        console.log("file", file);
        console.log("caption", caption);

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = await uploadFileToS3(buffer, file.name);

        return new Response('File uploaded successfully!', {
            status: 200,
            headers: { message: 'message not found' },
        });
        
    } catch (error) {

        console.error(error);
        return new Response('Oh No!', {
            status: 300,
            headers: { error: 'Failed to upload image' },
        });

    }
}
