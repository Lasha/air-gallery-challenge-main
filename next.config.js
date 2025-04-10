/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false, // TODO: change this to false to enable Next's image optimization
    domains: ["picsum.photos", "api.air.inc", "air-prod.imgix.net"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
