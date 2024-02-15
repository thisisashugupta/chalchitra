import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const title = "title title";
const description = "description description";
const createdAt = "2022-01-01T00:00:00Z";



//     useEffect(() => {
    // async function fetchVideoData() {
            // 
        // const response = await fetch(`/api/video?v=${v}`, {
            // method: 'GET',
            // headers: { 'Content-Type': 'application/json' },
        // })
        // const body = await response.json()
        // setCreatedAt(body.createdAt)
        // setTitle(body.title)
        // setDescription(body.content)
        // 
    // }
    // fetchVideoData()
// }, [v])
// 

export default function VideoDetails() {
    return (<div>
    <p className='mx-4 mt-2 text-lg font-bold'>{title}</p>
    <p className='mx-4 text-xs text-gray-500'>25K views . 4 weeks ago . <span className='text-black'>...more</span></p>
    <Accordion className='mx-4 my-2 px-4 border bg-slate-200 rounded-lg' type="single" collapsible>
        <AccordionItem value="item-1">
        <AccordionTrigger>
            Description
        </AccordionTrigger>
        <AccordionContent>
            <p>{description}</p>
            <p className='mt-2 text-xs text-gray-500'>Uploaded on {createdAt.substring(0,10)}</p>
        </AccordionContent>
        </AccordionItem>
    </Accordion>
</div>);
}