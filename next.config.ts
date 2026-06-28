import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/admin-login.php',
        destination: '/admin-login.html',
      },
      {
        source: '/admin.php',
        destination: '/admin.html',
      },
    ];
  },
};

export default nextConfig;
