import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from 'lucide-react'

interface DropdownProps {
    video_id: string;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Dropdown({video_id, setRefresh}: DropdownProps) {

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
        <DropdownMenu>
            <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/video/${video_id}/edit`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleDelete} className='text-red-500 hover:text-red-600'>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}