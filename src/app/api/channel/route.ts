import { type NextRequest, NextResponse } from "next/server";
import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient();
import { User } from '@prisma/client';

type UserResponse = User | null;
// TODO: Channel to User

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams;
    const user_id = Number(searchParams.get('user_id'));

    try {

        const data : UserResponse = await prisma.user.findUnique({
            where: {
                id: user_id
            }
        });

        if (!data) return NextResponse.json({message: 'Not Found'}, {status: 404});
        return NextResponse.json(data);

    } catch (error) {

        console.error('error', error);
        return NextResponse.json({message: 'Not Found'}, {status: 404});

    } finally {
        await cleanup();
    }
}