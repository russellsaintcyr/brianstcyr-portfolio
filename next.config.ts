
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.myportfolio.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  },
};

export default nextConfig;
