import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/brianstcyr-portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/brianstcyr-portfolio/' : '',
  images: {
    unoptimized: true,
    qualities: [75, 85],
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
};

export default nextConfig;
