import { type Video, type User } from '@prisma/client'

type VideoWithAuthor = Partial<Video> & { author: Partial<User> }

export type { VideoWithAuthor }