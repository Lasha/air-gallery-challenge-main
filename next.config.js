/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    domains: ["picsum.photos", "api.air.inc", "air-prod.imgix.net"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
