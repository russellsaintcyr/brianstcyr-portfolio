
import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS || process.env.EXPORT_MODE;

const nextConfig: NextConfig = {
  ...(isGitHubPages && {
    output: 'export',
    trailingSlash: true,
    basePath: '/brianstcyr-portfolio',
    assetPrefix: '/brianstcyr-portfolio/',
    images: {
      unoptimized: true,
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
      NEXT_PUBLIC_BASE_PATH: '/brianstcyr-portfolio',
    },
  }),
  ...(!isGitHubPages && {
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
  })
};

export default nextConfig;
