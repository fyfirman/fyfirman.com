const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  reactStrictMode: false, // Disabled the strict mode for `react-stack-grid` issue https://github.com/tsuyoshiwada/react-stack-grid/issues/18
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return {
      afterFiles: [{ source: "/l/:path*", destination: "/_404/:path*" }],
    };
  },
};

module.exports = withBundleAnalyzer(config);
