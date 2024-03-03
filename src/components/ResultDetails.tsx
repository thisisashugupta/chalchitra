import { MoreVertical } from "lucide-react";
import Link from "next/link";

interface ResultDetailsProps {
    title: string;
    views: number;
    uploadedAt: string;
    description: string;
    authorImage: string;
    author: string;
}

export default function ResultDetails({ title, views, uploadedAt, description, authorImage, author }: ResultDetailsProps) {
    return (
        <div className='w-full flex flex-col cursor-pointer'>
    
            <div className='flex justify-between space-x-2 text-md font-medium'>
                <div className="line-clamp-2">{title}</div>
                <div className="min-w-10 h-6">
                    <div className='hidden lg:block w-6 h-6 text-center pt-[2px] font-bold hover:bg-gray-200 rounded-full'><MoreVertical className='mx-auto' strokeWidth={1} size={20} /></div>
                </div>
            </div>

            <div className='text-xs text-gray-500'>
                <span>{`${views}`} views</span><span> • {`${uploadedAt}`} ago</span>
            </div>

            <div className='flex items-center py-3 space-x-2'>
                <Link className="rounded-full overflow-hidden" href={`/user/${author}`}><img className="w-6 h-6" src='https://picsum.photos/200' /></Link>
                <Link className='text-xs text-gray-500 hover:text-black' href={`/user/${author}`}>{author}</Link>
            </div>

            <div className='text-xs text-gray-600 line-clamp-2' id='description'>{description}</div>

        </div>
    );
}