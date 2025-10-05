const path = require("path");

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repository = process.env.GITHUB_REPOSITORY?.split("/")?.[1] ?? "";
const isUserOrOrgPage = repository.endsWith(".github.io");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isGitHubActions && !isUserOrOrgPage ? `/${repository}` : undefined,
  assetPrefix: isGitHubActions && !isUserOrOrgPage ? `/${repository}/` : undefined,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"), // pathを利用
    };
    return config;
  },
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
