import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isProd ? "/rfw/" : "", // Replace "project" with your GitHub repository name
  assetPrefix: isProd ? "/rfw/" : "",
  async rewrites() {
    return [
      {
        source: '/images',
        destination: '/rfw/images',
      },
    ]
  },
};

export default nextConfig;
