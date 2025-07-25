import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'backend',
        port: '3005',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3005',
        pathname: '/**',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/apartments',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
