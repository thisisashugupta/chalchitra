export {default} from 'next-auth/middleware';

export const config = { matcher: ["/upload", "/uploads", "/uploadViaServer"] }