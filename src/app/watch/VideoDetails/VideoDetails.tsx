"use server"

import { useVideoDetails } from "@/hooks/server/useVideoDetails"

import VideoTitle from "@/app/watch/VideoDetails/VideoTitle"
import AuthorCard from "@/app/watch/VideoDetails/AuthorCard"
import ButtonsTray from "@/app/watch/VideoDetails/ButtonsTray"
import DescriptionBox from "@/app/watch/VideoDetails/DescriptionBox"

interface VideoDetailsProps {
    v: string;
}

export default async function VideoDetails({v}: VideoDetailsProps) {
    console.log('Video Details page');
    const { video } = await useVideoDetails(v);

    return (
    <div className="mt-3 w-full px-3 md:px-0">

        <VideoTitle title={video?.title} />

        <div className="relative flex flex-col md:flex-row md:flex-wrap gap-3 mt-2 justify-between font-semibold">
            <AuthorCard author={video?.author} />
            <ButtonsTray video={video} />
        </div>

        <DescriptionBox video={video} />
    </div>);
}