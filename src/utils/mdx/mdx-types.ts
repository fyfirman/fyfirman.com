import { ReadTimeResults } from "reading-time";

export interface Frontmatter {
  [key: string]: number | string | Date | unknown;
}

export enum BlogLanguage {
  EN = "en",
  ID = "id",
}

export interface BlogFrontmatter extends Frontmatter {
  title: string;
  publishedAt: string;
  description: string;
  language: BlogLanguage;
  coverImage: string;
  readingTime: ReadTimeResults;
  hide?: boolean;
}

export interface AIArtFrontmatter extends Frontmatter {
  title: string;
  createdAt: string;
  image: string;
  prompt: string;
  model: string;
  tags: string[];
  hide?: boolean;
}
