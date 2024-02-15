"use server"

import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface VideoDetailsProps {
    v: string;
}

export default async function VideoDetails({v}: VideoDetailsProps) {

    let title = "title title";
    let description = "description description";
    let createdAt = new Date();

    try {
        const response = await prisma.video.findUnique({
            where: {
                video_id: v
            }
        });

        if (!response) return (<>No video found</>);

        title = response.title!;
        description = response.content!;
        createdAt = response.createdAt!;

    } catch (error) {
        console.error(error);
    } finally {
        await cleanup();
    }
    
    return (
    <div>
        <p className='mx-4 mt-2 text-lg font-bold'>{title}</p>
        <p className='mx-4 text-xs text-gray-500'>25K views . 4 weeks ago . <span className='text-black'>...more</span></p>
        <Accordion className='mx-4 my-2 px-4 border bg-slate-200 rounded-lg' type="single" collapsible>
            <AccordionItem value="item-1">
            <AccordionTrigger>
                Description
            </AccordionTrigger>
            <AccordionContent>
                <p>{description}</p>
                <p className='mt-2 text-xs text-gray-500'>Uploaded on {createdAt.toString().substring(0,10)}</p>
            </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>);
}