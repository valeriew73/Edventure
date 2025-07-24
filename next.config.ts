import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: [
    "@llm-tools/embedjs",
    "@llm-tools/embedjs-loader-csv",
    "@llm-tools/embedjs-loader-image",
    "@llm-tools/embedjs-loader-markdown",
    "@llm-tools/embedjs-loader-msoffice",
    "@llm-tools/embedjs-loader-pdf",
    "@llm-tools/embedjs-loader-sitemap",
    "@llm-tools/embedjs-loader-web",
    "@llm-tools/embedjs-loader-xml",
    "@llm-tools/embedjs-openai",
    "@llm-tools/embedjs-qdrant",
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
