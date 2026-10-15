import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "4sqblast.org",
        pathname: "/**",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
