import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
            },
        ],
        unoptimized: true,
    },
    async headers() {
        return [
            {
                source: '/_next/image',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=2678400, immutable', // 31 days
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
