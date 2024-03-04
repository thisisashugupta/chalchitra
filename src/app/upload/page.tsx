"use client"

import { useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function UploadPage() {

  const [video, setVideo] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [uploading, setUploading] = useState<string | null>(null);


  const handleVideoFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if(selectedFile instanceof File) setVideo(selectedFile);
  }

  const handleThumbnailFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if(selectedImage instanceof File) setThumbnail(selectedImage);
  }

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    if(!video) return;
    if(!thumbnail) return;
    setUploading("Getting signed URL...");

    try {
      
        // get signed url from server

      const response = await fetch("/api/s3Url", { method: "GET" });
      const { video_id, videoUrl, thumbnail_id, thumbnailUrl } = await response.json();
      // console.log('Signed URL:', url);
      setUploading("Uploading Video...");
      // post video directly to the signedUrl using PUT request
      await fetch(videoUrl, {
        method: "PUT",
        body: video,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setVideoUrl(videoUrl.split('?')[0]);
      setUploading("Uploading Thumbnail...");
      // post thumbnail directly to the signedUrl using PUT request
      await fetch(thumbnailUrl, {
        method: "PUT",
        body: thumbnail,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setThumbnailUrl(thumbnailUrl.split('?')[0]);
      setUploading("Saving info to db...");
      // post request to my server to save some additional data into db
      const response3 = await fetch("/api/video", {
        method: "POST",
        body: JSON.stringify({ title, description, video_id, thumbnail_id }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      await response3.json();

    } catch (error) {
      console.error(error);
    } finally {
      setUploading(null);
    }
    
  }

  return (
    <main className="min-w-screen flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col items-center justify-center my-4">

      {videoUrl && (
        <div>
          <video className='max-h-screen md:rounded-2xl' controls autoPlay>
            <source src={videoUrl} type="video/mp4"/>
          </video>
          <p className='my-4 text-center text-sm'>Video uploaded successfully</p>
        </div>
      )}

        <form className='space-y-2 text-center' onSubmit={handleSubmit}>
          <Label htmlFor='video'>Choose Video</Label>
          <Input name='video' onChange={handleVideoFileChange} type="file" accept="video/*" required />
          <Label htmlFor='thumbnail'>Choose Thumbnail</Label>
          <Input name='thumbnail' onChange={handleThumbnailFileChange} type="file" accept="image/*" required />
          <Input name='title' onChange={e => setTitle(e.target.value)} type="text" value={title} placeholder='Title' required />
          <Textarea name='description' onChange={e => setDescription(e.target.value)} value={description} placeholder='Description (optional)' />
          <Button type="submit" disabled={!video || title === "" || uploading!==null}>
            {uploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{uploading}</> : "Upload"}
          </Button>
        </form>        
      </div>
    </main>
  )
}