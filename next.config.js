/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/books'
      }
    ]
  }
}

module.exports = nextConfig
