import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/providers/PrismaProvider";
import {User, Playlist} from '@prisma/client';

type UserPlaylistResponse = (User & { playlists: Playlist[] | null }) | null;

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams;
    const user_id = Number(searchParams.get('user_id'));

    try {

        const data : UserPlaylistResponse = await prisma.user.findUnique({
            where: {
                id: user_id
            },
            include: {
                playlists: true
            }
        });

        if (!data) return NextResponse.json({message: 'Not Found'}, {status: 404});
        return NextResponse.json(data);

    } catch (error) {

        console.log('error', error);
        return NextResponse.json({message: 'Not Found'}, {status: 404});

    }
}