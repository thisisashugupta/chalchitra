'use server';

import React from 'react';
import { Video } from '@prisma/client';
import { type NextRequest, NextResponse } from 'next/server';
import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();

const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION

type VideoDetailsProps = Partial<Video> & {name: string};

const VideoList = async ({searchParams}:any) => {
    // const [videos, setVideos] = useState<Partial<Video>[]>([]);
    // const searchParams = useSearchParams();
    const searchQuery = searchParams['search_query'];

    let videos:any[] = [];

    try {
        const response = await prisma.video.findMany({
            where: {
                title: {
                    contains: `${searchQuery?.toLowerCase()}`,
                    mode: "insensitive",
                },
            },
            include: {
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        
        videos = response.map(({ id, title, video_id, author, thumbnail_id }) => ({ id, title, video_id, thumbnail_id, name: author.name }));
        console.log("videos", videos);
        
    } catch (error) {
        console.error(error);
    } finally {
        await cleanup();
    }

    const videoUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/thumbnails`

    return (
        <div>
            { videos.length>0 ? 
                <>
                <h2>Videos</h2>
                    {videos.map((video: VideoDetailsProps) => (
                    <div key={video.id}>
                        <img src={`${videoUrl}/${video.thumbnail_id}`} alt="" />
                        <h3>{video.title}</h3>
                        <p>{video.name}</p>
                    </div>
                    ))}
                </> 
                : 
                <p>No videos found.</p>
            }
        </div>
    );
};

export default VideoList;