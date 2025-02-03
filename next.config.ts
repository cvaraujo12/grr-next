import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '/home/eu/Documentos/grr/meu-projeto-nextjs/src',
    };
    return config;
  },
};

export default nextConfig;
