/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    localeDetection: false,
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
