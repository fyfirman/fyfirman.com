import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import { getCompiledMDX, serializeFrontmatter } from "./mdx";
import { AIArtFrontmatter } from "./mdx-types";

const AI_ART_PATH = path.join(process.cwd(), "content/ai-art");

const AIArtFrontmatterSchema = z.object({
  title: z.string().min(1),
  createdAt: z.string().refine(
    (val) => {
      // Validate ISO 8601 date string (supports date-only YYYY-MM-DD and full datetime formats)
      const date = new Date(val);
      if (isNaN(date.getTime())) return false;
      // Check if it matches ISO 8601 format patterns
      // YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss... (with optional timezone)
      return /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})?)?$/.test(val);
    },
    { message: "createdAt must be a valid ISO 8601 date string (e.g., '2024-12-19' or '2024-12-19T00:00:00.000Z')" },
  ),
  image: z.string().min(1),
  prompt: z.string().min(1),
  model: z.string().min(1),
  tags: z.array(z.string()).min(1, "tags must be a non-empty array"),
  hide: z.boolean().optional(),
});

const AIArtPostSchema = AIArtFrontmatterSchema.extend({
  slug: z.string().min(1),
});

export const getAIArtFileContent = (filename: string) => {
  return fs.readFileSync(path.join(AI_ART_PATH, filename), "utf8");
};

export const getSingleAIArt = async (slug: string) => {
  const source = getAIArtFileContent(`${slug}.mdx`);
  const { code, frontmatter } = await getCompiledMDX(source);
  const serializedFrontmatter = serializeFrontmatter(frontmatter);

  // Validate frontmatter with Zod
  const validatedFrontmatter = AIArtFrontmatterSchema.parse(serializedFrontmatter);

  return {
    code,
    frontmatter: validatedFrontmatter as AIArtFrontmatter,
  };
};

export interface AIArtPost extends AIArtFrontmatter {
  slug: string;
}

export const getAllAIArtPosts = (): AIArtPost[] => {
  try {
    if (!fs.existsSync(AI_ART_PATH)) {
      return [];
    }

    return fs
      .readdirSync(AI_ART_PATH)
      .filter((postPath) => /\.mdx?$/.test(postPath))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx?$/, "");
        try {
          const source = getAIArtFileContent(fileName);
          const { data } = matter(source);
          const serializedData = serializeFrontmatter(data);

          // Validate frontmatter with Zod (fail-fast)
          const validatedData = AIArtFrontmatterSchema.parse({
            ...serializedData,
            hide: serializedData.hide ?? false,
          });

          // Validate the complete post with slug
          const post = AIArtPostSchema.parse({
            ...validatedData,
            slug,
          });

          return post;
        } catch (error) {
          // Include filename and received data in error message for easier debugging
          if (error instanceof z.ZodError) {
            // Re-read to get the actual data that failed validation
            const source = getAIArtFileContent(fileName);
            const { data } = matter(source);
            const serializedData = serializeFrontmatter(data);

            throw new Error(
              `Validation error in file "${fileName}" (slug: "${slug}"):\n` +
                `Received data: ${JSON.stringify(serializedData, null, 2)}\n` +
                `Validation errors:\n${error.errors.map((e) => `  - ${e.path.join(".")}: ${e.message}`).join("\n")}`,
            );
          }
          throw new Error(
            `Error processing file "${fileName}" (slug: "${slug}"): ${
              error instanceof Error ? error.message : String(error)
            }`,
          );
        }
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("Error reading AI Art posts:", error);
    throw error; // Fail-fast: re-throw validation errors
  }
};

export const getAIArtByTag = (tag: string): AIArtPost[] => {
  return getAllAIArtPosts().filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase().includes(tag.toLowerCase())),
  );
};

export const getAllTags = (): string[] => {
  const posts = getAllAIArtPosts();
  const allTags = posts.flatMap((post) => post.tags);
  return Array.from(new Set(allTags));
};
