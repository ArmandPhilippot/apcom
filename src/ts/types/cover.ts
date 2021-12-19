export type Cover = {
  altText: string;
  sourceUrl: string;
  title: string;
} | null;

export type RawCover = {
  node: Cover;
} | null;
