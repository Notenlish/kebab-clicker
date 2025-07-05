import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true, // Recommended for itch.io
  },
  assetPrefix: "./",
  basePath: "",
};

export default nextConfig;
