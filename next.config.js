/** @type {import('next').NextConfig} */

const {i18n} = require('./next-i18next.config.js');

const nextConfig = {
  images: {
    domains: ['localhost', 'r4.wallpaperflare.com'],
  },
  i18n,
};

module.exports = nextConfig;
