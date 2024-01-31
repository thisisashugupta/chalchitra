"use client"

import {useState} from 'react';
import Link from 'next/link';

export default function NewPost() {

  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);


  const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if(selectedFile instanceof File) setFile(selectedFile);
    setUploadedUrl(null);
  }

  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault();
    if(!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      // const response = await axios.post("/api/posts", formData);
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData
      });
      const body = await response.json();
      setUploadedUrl(body.fileUrl);

    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
    
  }

  return (
    <main className="flex flex-col items-center justify-between p-24 bg-black text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 pt-8">
          ChalChitra
        </p> */}
        <div className="flex flex-col w-full items-center justify-center space-y-6">
          <p>upload video files through server</p>
          <form className='space-x-4' onSubmit={handleSubmit}>
            <input className='border-2 border-white p-2' name='image' onChange={handleFileChange} type="file" accept="video/*"></input>
            <input className='text-black p-2' name='caption' onChange={e => setCaption(e.target.value)} type="text" value={caption} placeholder='Caption'></input>
            <button className='border-2 border-white p-2 hover:text-gray-300 hover:border-gray-300' type="submit" disabled={!file || uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </form>

          {uploadedUrl && <Link href={uploadedUrl} target='_blank' className='text-blue-500 hover:text-blue-600'>{uploadedUrl}</Link>}

          <p>go to <Link href='/upload' className='hover:text-green-500 border-green-500 border p-2'>/upload</Link> route to upload videos directly from frotend, withput routing through server.</p>
        </div>
      </div>
    </main>
  )
}