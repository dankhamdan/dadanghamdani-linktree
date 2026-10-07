import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel handles deployment natively — no need for standalone output
  // (standalone is for Docker / self-hosting)
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  // Allow cross-origin preview (e.g. sandbox preview domain)
  allowedDevOrigins: ["*.space-z.ai", "*.vercel.app"],
};

export default nextConfig;
