/** @type {import('next').NextConfig} */
// security headers
const securityHeaders = [
  // This header controls DNS prefetching, allowing browsers to proactively perform domain name resolution on external links, images, CSS, JavaScript, and more. This prefetching is performed in the background, so the DNS is more likely to be resolved by the time the referenced items are needed. This reduces latency when the user clicks a link.
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // This header stops pages from loading when they detect reflected cross-site scripting (XSS) attacks. Although this protection is not necessary when sites implement a strong Content-Security-Policy disabling the use of inline JavaScript ('unsafe-inline'), it can still provide protection for older web browsers that don't support CSP.
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // This header indicates whether the site should be allowed to be displayed within an iframe.
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // his header informs browsers it should only be accessed using HTTPS, instead of using HTTP. Using the configuration below, all present and future subdomains will use HTTPS for a max-age of 2 years. This blocks access to pages or subdomains that can only be served over HTTP.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // This header allows you to control which features and APIs can be used in the browser. It was previously named Feature-Policy. You can view the full list of permission option
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  // This header prevents the browser from attempting to guess the type of content if the Content-Type
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
]

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'backend.neuralsight.ai'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth',
        permanent: true,
      },
    ]
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/dashboard',
  //     },
  //   ]
  // },
  // async headers() {
  //   return [
  //     {
  //       // Apply these headers to all routes in your application.
  //       source: '/:path*',
  //       headers: securityHeaders,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
