const { join } = require('path');
const workspace = join(__dirname, '..');


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	experimental: {
    externalDir: true,
    eslint: {
      // This allows production builds to successfully complete even if the project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  },
}

module.exports = nextConfig
