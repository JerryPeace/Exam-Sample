/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  compiler: {
    emotion: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['s3-ap-northeast-1.amazonaws.com', 'bit.ly'],
    formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
});
