'use client'

import React from 'react'
import { mutateVideoServerAction } from "@/app/actions"
import { Video } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from "@/components/ui/use-toast"

interface EditVideoFormProps {
    video: Video;
}

export default function EditVideoForm({ video }: EditVideoFormProps) {
    const id = video.id;
    const sendWithFormData = mutateVideoServerAction.bind(null, id);
    const { toast } = useToast()

    // console.log('video from EditVideoForm');
    // console.log(video);

    return (
            <form className='w-full space-y-4 flex flex-col items-left' action={sendWithFormData}>

                <div>
                <Label htmlFor='title'>Title</Label>
                <Input type="text" name="title" defaultValue={video.title}/>
                </div>
                
                <div>
                <Label htmlFor="content">Description</Label>
                <Textarea className='min-h-24 max-h-72' name="content" defaultValue={video.content!}/>
                </div>
                
                <div className='flex space-x-3 items-center'>
                <Label htmlFor="published">Published</Label>
                <Input className='w-4 h-4' type="checkbox" name="published" defaultChecked={video.published!}/>
                </div>
                
                {/* * * * * * * playlistId * * * * * * */}
                {/* <Label htmlFor="playlistId">playlistId</Label> */}
                {/* <Input type="text" name="playlistId" defaultValue={video?.playlistId?.toString()}/> */}

                <Button type="submit" onClick={() => toast({ title: "Updated Successfully" })}>Save</Button>
            </form>
    );
};