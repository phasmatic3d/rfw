import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isProd ? "/rfw" : "/rfw", 
  assetPrefix: isProd ? "/rfw" : "/rfw",
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
