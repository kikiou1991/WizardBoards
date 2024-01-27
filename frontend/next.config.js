const { hostname } = require('os');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/wizardboards',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'trello.com',
      },
    ],
  },
};

module.exports = nextConfig;
