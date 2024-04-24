const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION

const playlistUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/playlists`
const thumbnailUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/thumbnails`
const videoUrl = `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/videos`

export { playlistUrl, thumbnailUrl, videoUrl }
