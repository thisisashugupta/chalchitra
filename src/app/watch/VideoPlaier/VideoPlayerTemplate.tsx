interface VideoPlayerTemplateProps {
    text: string,
    className?: string
}

export default function VideoPlayerTemplate ({text, className}: VideoPlayerTemplateProps) {
    return <div className={`${className} w-full md:rounded-xl bg-black w-full aspect-video text-red-500 flex items-center justify-center`}>
    <p>{text}</p>
</div>
}