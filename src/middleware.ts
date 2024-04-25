export {default} from 'next-auth/middleware';

export const config = { matcher: ["/upload", "/uploads", "/uploadViaServer", "/feed/you", "/feed/subscriptions", "/feed/playlists", "/feed/downloads", "/feed/channels"] }