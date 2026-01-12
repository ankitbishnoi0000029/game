import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure for serverless environment
  experimental: {
    serverComponentsExternalPackages: ['mysql2'],
  },
};

export default nextConfig;
