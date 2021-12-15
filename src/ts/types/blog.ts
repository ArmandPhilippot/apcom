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

export type getPostsListReturn = (
  first?: number,
  after?: string
) => Promise<PostsList>;

export type BlogPageProps = {
  data: PostsList;
};
