import React from 'react';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { MoreVertical } from 'lucide-react';

export default function VideoCard({title, author, video_id, setRefresh}: {title: string, author: string, video_id: string, setRefresh: React.Dispatch<React.SetStateAction<boolean>> }) {

    async function handleDelete() {
        try {
            await fetch(`/api/video?v=${video_id}`, {
                method: 'DELETE'
            });
            setRefresh((prevVal) => !prevVal);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex w-full items-center justify-center m-2">
            <div className='flex flex-col space-y-2'>
                <Link href={`/watch?v=${video_id}`}>
                    <img src='https://picsum.photos/200' className="rounded-lg w-48 h-24" />
                </Link>
                <div className='flex align-center justify-between'>
                    <div>
                        <div className='font-bold'>{title}</div>
                        <div className='text-sm'>{author}</div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete} className='text-red-500 hover:text-red-600'>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )

}