import type { NextConfig } from "next";

const isProd = true || process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  basePath: isProd ? "/project" : "", // Replace "project" with your GitHub repository name
  assetPrefix: isProd ? "/project/" : "",
};

export default nextConfig;
