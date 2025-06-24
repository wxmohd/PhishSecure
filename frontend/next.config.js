/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Add compiler options to handle hydration issues
  compiler: {
    // Suppress hydration errors in production
    styledComponents: true
  }
}

module.exports = nextConfig
