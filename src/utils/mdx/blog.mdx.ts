import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime, { ReadTimeResults } from "reading-time";
import { getCompiledMDX, serializeFrontmatter } from "./mdx";
import { BlogFrontmatter } from "./mdx-types";

const BLOGS_PATH = path.join(process.cwd(), "content/blogs");

export const getBlogFileContent = (filename: string) => {
  return fs.readFileSync(path.join(BLOGS_PATH, filename), "utf8");
};

export const getSingleBlogPost = async (slug: string) => {
  const source = getBlogFileContent(`${slug}.mdx`);
  const { code, frontmatter } = await getCompiledMDX(source);
  return {
    code,
    frontmatter: {
      ...(serializeFrontmatter(frontmatter) as BlogFrontmatter),
      readingTime: readingTime(source),
    },
  };
};

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  readingTime: ReadTimeResults;
}

export const getAllBlogPosts = (): BlogPost[] => {
  return fs
    .readdirSync(BLOGS_PATH)
    .filter((postPath) => /\.mdx?$/.test(postPath))
    .map((fileName) => {
      const source = getBlogFileContent(fileName);
      const { data } = matter(source);

      const slug = fileName.replace(/\.mdx?$/, "");

      return {
        ...(serializeFrontmatter(data) as BlogFrontmatter),
        slug,
        readingTime: readingTime(source),
      };
    });
};
