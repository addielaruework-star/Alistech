/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Modern remotePatterns config (Next.js 13+)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // broad wildcard — covers any cloud name / folder
      },
    ],
    // Legacy fallback for older next/image usage
    domains: ["res.cloudinary.com"],
    formats: ["image/avif", "image/webp"],
  },
  // Cache headers for instant navigation and image loading
  async headers() {
    return [
      {
        // Cache optimized next/image output for 1 year (immutable)
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache static assets (JS, CSS, fonts)
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
