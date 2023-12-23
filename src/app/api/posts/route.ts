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

    const uploadParams = {
        Bucket: bucketName,
        Key: `myFolder/${fileName}`, // filename
        Body: fileBuffer, // actual file
        ContentType: "image/jpeg", // type of file
        // ACL: "public-read",
    };

    const command = new PutObjectCommand(uploadParams);
    const uploadResponse = await s3Client.send(command);
    console.log("uploadResponse", uploadResponse);
    return fileName;
    
}

export async function GET(req : Request, res : Response) {
    return new Response('Hello World!', {
        status: 200,
        headers: { message: 'bro kya kr raha hai? post request hai na, get kyu khol raha hai' },
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
            headers: { message: 'message not found', fileName: fileName },
        });
        
    } catch (error) {

        console.error(error);
        return new Response('Oh No!', {
            status: 300,
            headers: { error: 'Failed to upload image' },
        });

    }
}
