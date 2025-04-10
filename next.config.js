/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // TODO: change this to false to enable Next's image optimization
    domains: ["picsum.photos", "api.air.inc"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
