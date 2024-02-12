"use client"

import {useState} from 'react';
// import Link from 'next/link';
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export default function UploadPage() {

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");


  const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if(selectedFile instanceof File) setFile(selectedFile);
  }

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    if(!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);
    formData.append("description", description);
    // console.log(formData);
    

    try {
      
        // get signed url from server

      const response = await fetch("/api/s3Url", { method: "GET" });
      const { video_id, url } = await response.json();
      // console.log('Signed URL:', url);

      // post video directly to the signedUrl using PUT request
      const response2 = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const videoUrl = url.split('?')[0];
      setVideoUrl(videoUrl);

      // post request to my server to save some additional data into db
      const response3 = await fetch("/api/video", {
        method: "POST",
        body: JSON.stringify({ title, description, video_id }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      await response3.json();

    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
    
  }

  return (
    <main className="min-w-screen flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col items-center justify-center">

      {videoUrl && (
        <div>
          <video className='md:rounded-2xl' width="768" controls autoPlay>
            <source src={videoUrl} type="video/mp4"/>
          </video>
          <p className='my-4 text-center text-sm'>Video uploaded successfully</p>
        </div>
      )}

        <form className='space-y-2 text-center' onSubmit={handleSubmit}>
          <Input name='video' onChange={handleFileChange} type="file" accept="video/*" /*accept=".jpg, .jpeg, .png"*/ required />
          <Input name='title' onChange={e => setTitle(e.target.value)} type="text" value={title} placeholder='Title' required />
          <Textarea name='description' onChange={e => setDescription(e.target.value)} value={description} placeholder='Description (optional)' />
          <Button type="submit" disabled={!file || title === "" || uploading}>
            {uploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Uploading...</> : "Upload"}
          </Button>
        </form>        

        {/* <p className='mx-2 my-4 border-2 border-black p-4 rounded'>go to <Link href='/uploadViaServer' className='hover:text-green-500 border-green-500 border p-2'>/uploadViaServer</Link> route to upload videos routing through server.</p> */}
      </div>
    </main>
  )
}