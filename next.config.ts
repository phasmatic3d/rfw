import type { NextConfig } from "next";

const isProd = true || process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isProd ? "/rfw" : "", // Replace "project" with your GitHub repository name
  assetPrefix: isProd ? "/rfw/" : "",
};

export default nextConfig;
