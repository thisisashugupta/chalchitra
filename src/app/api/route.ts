import { NextRequest, NextResponse } from 'next/server'

import { dbcall as getUsers } from './index'

export function POST(request: Request) {
    getUsers();
    return NextResponse.json({ data: 'Hello There' }, {status: 200});
}