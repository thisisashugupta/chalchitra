import { type NextRequest, NextResponse } from "next/server"
import { getPrismaClient, cleanup } from "@/app/providers/PrismaProvider"
const prisma = getPrismaClient()
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/app/api/auth/[...nextauth]/options'

export async function POST(request : NextRequest) {

    try {

        // const session = await getServerSession(authOptions)
        // const email = session?.user?.email!
    
        const requestBody = await request.json()
        const { video_id } = requestBody
        
        // increment views count
        const response = await prisma.video.update({
            where: { video_id: video_id },
            data: { views: { increment: 1 } },
        })

        console.log({
            views: response.views,
            video_id: response.video_id,
            updatedAt: response.updatedAt,
        })
        
        return new NextResponse(JSON.stringify({
            message: `View added successfully.`
        }), { status: 200 })
        
    } catch (error) {
  
        console.error(error)
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error. Failed to increment view.' }), { status: 500 })
  
    } finally {
        await cleanup()
    }
}
