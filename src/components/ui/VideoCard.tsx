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

export default function VideoCard({title, author, video_id}: {title: string, author: string, video_id: string}) {

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
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                        {/* TODO: add delete function and edit form (pop-up or separate page?) */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                

            </div>

        </div>
    )

}