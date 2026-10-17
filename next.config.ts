import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "10.82.50.248",
    "10.82.50.248:3000",
    "10.82.50.248:3001",
    "10.106.64.248",
    "10.106.64.248:3000",
    "10.106.64.248:3001",
    "10.146.142.248",
    "10.146.142.248:3000",
    "10.146.142.248:3001",
    "localhost:3000",
    "localhost:3001",
    "127.0.0.1:3000",
    "127.0.0.1:3001",
  ],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=*, microphone=(), geolocation=*" },
        ],
      },
    ];
  },
};

export default nextConfig;
