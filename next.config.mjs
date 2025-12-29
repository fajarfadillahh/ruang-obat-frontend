/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "custom",
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
  output: "standalone",
};

export default nextConfig;
