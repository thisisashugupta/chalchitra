/** @type {import('next').NextConfig} */
const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: `${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com`,
          port: '',
          pathname: '/**',
        },
      ],
    },
  }

module.exports = nextConfig
