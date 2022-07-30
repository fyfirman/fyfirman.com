export interface Frontmatter {
  [key: string]: number | string | Date;
}

export enum BlogLanguage {
  EN = "en",
  ID = "id",
}

export interface BlogFrontmatter extends Frontmatter {
  title: string;
  published: string;
  description: string;
  language: BlogLanguage;
}
