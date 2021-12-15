import { ArticlePreview, ArticlePreviewResponse } from './articles';
import { PageInfo } from './pagination';

export type PostsListEdge = {
  cursor: string;
  node: ArticlePreviewResponse;
};

export type PostsListResponse = {
  posts: {
    edges: PostsListEdge[];
    pageInfo: PageInfo;
  };
};

export type PostsList = {
  posts: ArticlePreview[];
  pageInfo: PageInfo;
};

export type fetchPostsListReturn = (
  first?: number,
  after?: string
) => Promise<PostsListResponse>;

type PostsListProps = {
  first?: number;
  after?: string;
};

export type getPostsListReturn = (props: PostsListProps) => Promise<PostsList>;

export type BlogPageProps = {
  fallback: PostsList;
};
