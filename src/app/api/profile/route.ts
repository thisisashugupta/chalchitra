import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/providers/PrismaProvider";
import {User, Profile} from '@prisma/client';

type UserProfileResponse = ({ profile: Profile | null; } & User) | null;

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams;
    const user_id = Number(searchParams.get('user_id'));

    try {

        const data : UserProfileResponse = await prisma.user.findUnique({
            where: {
                id: user_id
            },
            include: {
                profile: true
            }
        });

        if (!data) return NextResponse.json({message: 'Not Found'}, {status: 404});
        return NextResponse.json(data);

    } catch (error) {

        console.log('error', error);
        return NextResponse.json({message: 'Not Found'}, {status: 404});

    }
}