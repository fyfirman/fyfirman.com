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
}
