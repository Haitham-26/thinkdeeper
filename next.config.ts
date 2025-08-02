import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/auth/login",
        has: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        permanent: false,
        destination: "/",
      },
      {
        source: "/auth/signup",
        has: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        permanent: false,
        destination: "/",
      },
      {
        source: "/questions",
        missing: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        permanent: false,
        destination: "/",
      },
    ];
  },
};

export default nextConfig;
