import { type NextRequest, NextResponse } from "next/server"

import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient()
import { User } from '@prisma/client'

type UserResponse = User | null

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const email: string | null = searchParams.get('email')

    if (!email) return NextResponse.json({message: 'Not Found'}, {status: 404})

    try {

        const data : UserResponse = await prisma.user.findUnique({
            where: { email }
        })

        if (!data) return NextResponse.json({message: 'Not Found'}, {status: 404})
        return NextResponse.json(data)

    } catch (error) {

        console.error('error', error)
        return NextResponse.json({message: 'Not Found'}, {status: 404})

    } finally {
        await cleanup()
    }
}