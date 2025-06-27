/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['flagcdn.com', 'res.cloudinary.com', 'via.placeholder.com'],
  },
  // Enable static optimization for better performance
  reactStrictMode: true,
  swcMinify: true,
  // Needed for Netlify deployment
  trailingSlash: true,
}

module.exports = nextConfig
