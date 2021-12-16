export type Cover = {
  altText: string;
  sourceUrl: string;
  title: string;
} | null;

export type CoverResponse = {
  node: Cover;
} | null;
