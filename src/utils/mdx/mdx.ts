import path from "path";
import { bundleMDX } from "mdx-bundler";
import remarkMdxImages from "remark-mdx-images";
import { Frontmatter } from "./mdx-types";

export const ROOT = process.cwd();

export const serializeFrontmatter = (frontmatter: Frontmatter): Frontmatter => {
  const result: Frontmatter = {};
  Object.keys(frontmatter).forEach((key) => {
    if (frontmatter[key] instanceof Date) {
      Object.assign(result, { [key]: (frontmatter[key] as Date).toISOString() });
      return;
    }
    Object.assign(result, { [key]: frontmatter[key] });
  });

  return result;
};

export const getCompiledMDX = async (source: string) => {
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(ROOT, "node_modules", "esbuild", "esbuild.exe");
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(ROOT, "node_modules", "esbuild", "bin", "esbuild");
  }

  const { code, frontmatter } = await bundleMDX({
    source,
    // cwd: path.join(ROOT, "public", "img"),
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkMdxImages];
      options.rehypePlugins = [...(options.rehypePlugins ?? [])];

      return options;
    },
    esbuildOptions(options) {
      options.outdir = path.join(ROOT, "public", "img", "mdx");
      options.loader = {
        ...options.loader,
        ".png": "file",
        ".jpg": "file",
      };

      // Set the public path to /img
      options.publicPath = "/img/mdx";

      // Set write to true so that esbuild will output the files.
      options.write = true;
      options.define = {
        "process.env.__NEXT_TRAILING_SLASH": JSON.stringify(process.env.__NEXT_TRAILING_SLASH),
        "process.env.__NEXT_IMAGE_OPTS": JSON.stringify(process.env.__NEXT_IMAGE_OPTS),
        "process.env.__NEXT_REACT_ROOT": JSON.stringify(process.env.__NEXT_REACT_ROOT),
        "process.env.__NEXT_OPTIMIZE_FONTS": JSON.stringify(process.env.__NEXT_OPTIMIZE_FONTS),
      };
      return options;
    },
    files: {},
  });

  return {
    code,
    frontmatter: serializeFrontmatter(frontmatter),
  };
};
