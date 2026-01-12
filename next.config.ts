import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure for serverless environment
  serverExternalPackages: ['mysql2'],
  // Make API routes dynamic to avoid static generation issues
  experimental: {
    serverComponentsExternalPackages: ['mysql2'],
  },
};

export default nextConfig;
