const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  images: {
    domains: ['cdn.animesynapse.com'], // Add your CDN domain
  },
});

module.exports = nextConfig;
