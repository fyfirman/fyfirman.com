import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";

export const ROOT = process.cwd();
export const BLOGS_PATH = path.join(process.cwd(), "content/blogs");

export const getFileContent = (filename: string) => {
  return fs.readFileSync(path.join(BLOGS_PATH, filename), "utf8");
};

export interface Frontmatter {
  [key: string]: number | string | Date;
}

const serializeFrontmatter = (frontmatter: Frontmatter): Frontmatter => {
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

const getCompiledMDX = async (source: string) => {
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(ROOT, "node_modules", "esbuild", "esbuild.exe");
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(ROOT, "node_modules", "esbuild", "bin", "esbuild");
  }

  const { code, frontmatter } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      options.rehypePlugins = [...(options.rehypePlugins ?? [])];

      return options;
    },
    files: {},
  });

  return {
    code,
    frontmatter: serializeFrontmatter(frontmatter),
  };
};

export const getSingleBlogPost = async (slug: string) => {
  const source = getFileContent(`${slug}.mdx`);
  return getCompiledMDX(source);
};

export const getAllBlogPosts = () => {
  return fs
    .readdirSync(BLOGS_PATH)
    .filter((postPath) => /\.mdx?$/.test(postPath))
    .map((fileName) => {
      const source = getFileContent(fileName);
      const slug = fileName.replace(/\.mdx?$/, "");
      const { data } = matter(source);

      return {
        frontmatter: data,
        slug,
      };
    });
};