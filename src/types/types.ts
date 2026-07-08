export type PostType = {
  slug: string;
  tags?: string[];
  title: string;
  date: number;
  coverImage: string;
  content?: string;
  readingMinutes?: number;
  info: string;
};
