import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        permanent: false,
        destination: "/profile",
      },
      {
        source: "/auth/login",
        has: [
          {
            type: "cookie",
            key: "token",
          },
        ],
        permanent: false,
        destination: "/profile",
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
        destination: "/profile",
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
      {
        source: "/profile",
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
