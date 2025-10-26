import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  transpilePackages: [
    '@hotel-project/domain', 
    '@hotel-project/service'
  ],
};

export default nextConfig;
