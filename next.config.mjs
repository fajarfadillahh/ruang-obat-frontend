/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ["@nextui-org/react", "@phosphor-icons/react"],
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/cbt/login",
      },
      {
        source: "/register",
        destination: "/cbt/register",
      },
      {
        source: "/programs/:path*",
        destination: "/cbt/programs/:path*",
      },
      {
        source: "/tests/:path*",
        destination: "/cbt/tests/:path*",
      },
      {
        source: "/dashboard",
        destination: "/cbt",
      },
      {
        source: "/myprograms",
        destination: "/cbt/myprograms",
      },
    ];
  },
};

export default nextConfig;
