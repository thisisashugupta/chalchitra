import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client, { bucketName, bucketRegion } from "@/app/providers/S3Provider"
import { NextResponse } from "next/server";

async function uploadFileToS3(file: any) {

    const buffer = Buffer.from(await file.arrayBuffer());

    // console.log(buffer);
    
    const uploadParams = {
        Bucket: bucketName,
        Key: file.name, // filename
        Body: buffer, // actual file
        ContentType: file.type, // type of file
        // ACL: "public-read",
    };
    const command = new PutObjectCommand(uploadParams);
    const response = await s3Client.send(command);
    // console.log(response);
    
    return file.name;
    
}

export async function GET(req : Request) {
    return new Response(JSON.stringify({ message: 'bro kya kr raha hai? post request hai na, get kyu khol raha hai' }), { status: 200 });
}

export async function POST(req : Request) {
    try {

        const formData = await req.formData();
        const file = formData.get('image');
        const caption = formData.get('caption');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const fileName = await uploadFileToS3(file);
        const fileUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`;
        // TODO: upload caption to db

        return new Response(JSON.stringify({message: 'File uploaded successfully!', fileName: fileName, fileUrl: fileUrl}), { status: 200 });
        
    } catch (error) {

        console.error(error);
        return new Response('Oh No!', {
            status: 500,
            headers: { error: 'Failed to upload video' },
        });

    }
}
