/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev.ruangobat.id",
      },
      {
        protocol: "https",
        hostname: "api.ruangobat.id",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
      {
        protocol: "https",
        hostname: "is3.cloudhost.id",
      },
      {
        protocol: "https",
        hostname: "ruangobat.is3.cloudhost.id",
      },
      {
        protocol: "https",
        hostname: "ruangobatdev.is3.cloudhost.id",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: [
      "@nextui-org/react",
      "@phosphor-icons/react",
      "react-hot-toast",
      "framer-motion",
      "swiper",
    ],
  },
};

export default nextConfig;
