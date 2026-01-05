import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-d873701d58fa449ab59e5094f06e4d23.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;