/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow preview host
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
        ],
      },
    ];
  },
  // For live preview behind proxy
  experimental: {
    // allow all hosts
  },
};

module.exports = nextConfig;
