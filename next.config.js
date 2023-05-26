/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // REMEBER THIS IF ERROR IN ESLINT ///
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig

/*
module.exports = {
  experimental: {
    concurrentFeatures: true,
  },
}
*/
