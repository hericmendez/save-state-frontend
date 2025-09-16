/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      { 
        protocol: 'https', 
        hostname: 'images.igdb.com' 
      }
    ]
  }
}

export default nextConfig

