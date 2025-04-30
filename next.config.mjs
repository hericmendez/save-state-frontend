/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    enableUndiciCookies: true, // permite cookies em fetch do App Router
  },
};

export default nextConfig;
