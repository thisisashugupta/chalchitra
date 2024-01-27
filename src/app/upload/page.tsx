"use client"

import {useState} from 'react';
import Link from 'next/link';

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
    console.log(formData);
    

    try {
      
        // get signed url from server

      const response = await fetch("/api/s3Url", { method: "GET" });
      const { video_id, url } = await response.json();
      console.log('Signed URL:', url);

      // post video directly to the signedUrl using PUT request
      const response2 = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response2.status, response2.statusText);
      const videoUrl = url.split('?')[0];
      console.log('video url:', videoUrl);
      setVideoUrl(videoUrl);

      // TODO: post request to my server to save some additional data into db
      const response3 = await fetch("/api/videos", {
        method: "POST",
        body: JSON.stringify({ title, description, videoUrl, video_id }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response3.json();
      console.log('data', data);

    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
    
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* <p className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8">
          ChalChitra
        </p> */}
        <div className="flex flex-col w-full items-center justify-center">
          <form className='space-x-4' onSubmit={handleSubmit}>
            <input className='border-2 p-2' name='video' onChange={handleFileChange} type="file" accept="video/*" /*accept=".jpg, .jpeg, .png"*/ />
            <input className='border-2 p-2' name='title' onChange={e => setTitle(e.target.value)} type="text" value={title} placeholder='Title' />
            <input className='border-2 p-2' name='description' onChange={e => setDescription(e.target.value)} type="text" value={description} placeholder='Description' />
            <button className='border-2 p-2' type="submit" disabled={!file || uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </form>

          {videoUrl && (
            <>
            <Link href={videoUrl} target='_blank' className='text-blue-500 hover:text-blue-700'>{videoUrl}</Link>
            <video width="750" controls autoPlay>
              <source src={videoUrl} type="video/mp4"/>
            </video>
            </>
          )}

          <p className='m-6'>go to <Link href='/' className='hover:text-green-500 border-green-500 border p-2'>/</Link> route to upload videos routing through server.</p>

        </div>
      </div>
    </main>
  )
}