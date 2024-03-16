"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import Image from "next/image"
import MoreOptions from "@/app/watch/buttons/MoreOptions"
import { Like, Dislike } from "@/app/watch/buttons/LikeDislike"
import Share from "@/app/watch/buttons/Share"
import Download from "@/app/watch/buttons/Download"
import { getElapsedTime, formatDate } from "@/lib/functions"
import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
import { Video } from "@prisma/client"
const prisma = getPrismaClient();
import DescriptionBox from "./DescriptionBox"

interface VideoDetailsProps {
    v: string;
}

const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION
const testUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/thumbnails/38eaabe3554423e614d1ca25951254fd`

console.log('Video Details page');

export default async function VideoDetails({v}: VideoDetailsProps) {

    const session = await getServerSession(authOptions);
    const email = session?.user?.email as string;

    let video: any | null = null;
    let elapsedTime = '';
    let uploadedOn = '';

    try {
        const response = await prisma.video.findUnique({
            where: {
                video_id: v
            },
            include: {
                author: {
                    select: {
                        ownChannel: {
                            select: {
                                name: true,
                                subscribers: true
                            }
                        },
                        name: true
                    }
                }
            }
        });

        // console.log(response);
        video = response;
        elapsedTime = getElapsedTime(video?.createdAt);
        uploadedOn = formatDate(video?.createdAt);

        if (!response) return (
            <div className="w-full mx-3 md:mx-0">
                <p className='mt-3 text-lg font-bold'>{"No Video Found."}</p>
            </div>
        );

    } catch (error) {
        console.error(error);
    } finally {
        await cleanup();
    }

    return (
    <div className="w-full px-3 md:px-0">
        <p className='mt-3 text-lg font-bold'>{video?.title}</p>

        <div className="relative flex flex-col md:flex-row md:flex-wrap gap-3 mt-2 justify-between font-semibold">
            <div id="left" className="flex items-left">
                <Image
                    src={testUrl}
                    alt="avatar"
                    width={100}
                    height={100}
                    className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                    <p className="font-semibold text-base">{`${video?.author?.ownChannel?.name}`}</p>
                    <p className="min-w-max font-base text-xs text-gray-500">{`${video?.author?.ownChannel?.subscribers}`} subscribers</p>
                </div>
                
                <div className="ml-6 flex items-center">
                <button className="bg-black dark:bg-white rounded-full px-4 py-2">
                    <p className="text-white dark:text-black text-sm font-semibold">Subscribe</p>
                </button>
                </div>
                
            </div>

            <div id="right" className="flex items-left md:items-right space-x-2 overflow-auto hide-scrollbar">
                <div className="min-w-max">
                    <Like email={email} video_id={video.video_id} likes={video?.likes} />
                    <Dislike video_id={video.video_id} />
                </div>
                <div><Share video_id={v} /></div>
                <div><Download video_id={v} /></div>
                <div><MoreOptions /></div>
            </div>
        </div>

        <DescriptionBox description={video?.content} elapsedTime={elapsedTime} />
    </div>);
}