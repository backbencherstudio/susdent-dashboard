import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false,
  },
  images: {
    domains: ["localhost", "randomuser.me"], // your allowed domains here
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
