import { NextApiRequest, NextApiResponse } from 'next';

export function GET(req: Request, res: Response) {

    return new Response('Hello from Next.js!', {
        status: 200,
        headers: { message: 'message not found' },
      })

}
