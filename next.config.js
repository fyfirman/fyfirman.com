/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  reactStrictMode: true,
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
      options: { mode: ["react-component"] },
    });
    return cfg;
  },
};
