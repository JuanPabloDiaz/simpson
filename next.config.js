/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Disable static optimization for all pages to ensure fresh data
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Disable static generation for all pages
    appDir: true,
  }
}

module.exports = nextConfig
