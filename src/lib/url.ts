"use client"

const BUCKET_NAME = process.env.NEXT_PUBLIC_BUCKET_NAME
const BUCKET_REGION = process.env.NEXT_PUBLIC_BUCKET_REGION

const thumbnailUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/thumbnails`
const videoUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/videos`

export { thumbnailUrl, videoUrl }
