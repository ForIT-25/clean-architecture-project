import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@hotel-project/domain"],
  typescript: {
    tsconfigPath: "./tsconfig.json"
  }
};

export default nextConfig;
