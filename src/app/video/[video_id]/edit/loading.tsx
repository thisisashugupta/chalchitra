import { Skeleton } from "@/components/ui/skeleton"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function EditVideoSkeleton() {
    return (
        <form className='w-full space-y-4 flex flex-col items-left'>

            <div>
            <Label>Title</Label>
            <Skeleton><Input /></Skeleton>
            </div>
            
            <div>
            <Label>Description</Label>
            <Skeleton><Textarea className='min-h-24 max-h-72' /></Skeleton>
            </div>
            
            <div className='flex space-x-3 items-center'>
            <Label>Published</Label>
            <Skeleton><Input className='w-4 h-4' type="checkbox" /></Skeleton>
            </div>
            
            {/* * * * * * * playlistId * * * * * * */}
            {/* <Label htmlFor="playlistId">playlistId</Label> */}
            {/* <Input type="text" name="playlistId" defaultValue={video?.playlistId?.toString()}/> */}

            <Skeleton><Button className="w-full">Save</Button></Skeleton>
        </form>
);
}