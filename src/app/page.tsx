"use client"

import axios from 'axios';
import {useState} from 'react';

export default function NewPost() {  
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");

  const submit = async (e : React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    await axios.post("/api/posts", formData)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 pb-6 pt-8">
          ChalChitra
        </p>
        <div className="flex flex-col w-full items-center justify-center">
          <form className='space-x-4' onSubmit={(e) => submit(e)}>
            <input className='border-2 border-white p-2 rounded-lg' name='image' onChange={e => setFile(e.target.files?.[0])} type="file" accept="image/*"></input>
            <input className='text-black p-2 rounded-lg' name='caption' onChange={e => setCaption(e.target.value)} type="text" value={caption} placeholder='Caption'></input>
            <button className='border-2 border-white p-2 rounded-lg' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </main>
  )
}