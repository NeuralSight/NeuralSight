/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEURALSIGHT_API_BASE_URL: 'https://prod.api.neurallabs.africa/api',
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
