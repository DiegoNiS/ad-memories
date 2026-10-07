import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ad-memories",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
