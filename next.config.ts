import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow importing Three.js and GSAP modules
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
