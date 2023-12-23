"use client"

import axios from 'axios';
import {useState} from 'react';

export default function NewPost() {

  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);


  const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if(selectedFile instanceof File) setFile(selectedFile);
  }

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    if(!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      // await axios.post("/api/posts", formData);
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData
      });

      const responseData = await response.json();
      console.log(responseData.status);

    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
    
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 pt-8">
          ChalChitra
        </p>
        <div className="flex flex-col w-full items-center justify-center">
          <form className='space-x-4' onSubmit={handleSubmit}>
            <input className='border-2 border-white p-2 rounded-lg' name='image' onChange={handleFileChange} type="file" accept="image/*"></input>
            <input className='text-black p-2 rounded-lg' name='caption' onChange={e => setCaption(e.target.value)} type="text" value={caption} placeholder='Caption'></input>
            <button className='border-2 border-white p-2 rounded-lg' type="submit" disabled={!file || uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}