import {
  ArticlePreview,
  ArticlePreviewResponse,
  ArticleSlug,
} from './articles';
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

export type FetchPostsListReturn = (
  first?: number,
  after?: string
) => Promise<PostsListResponse>;

type PostsListProps = {
  first?: number;
  after?: string;
};

export type GetPostsListReturn = (props: PostsListProps) => Promise<PostsList>;

export type BlogPageProps = {
  fallback: PostsList;
};

export type AllPostsSlugReponse = {
  posts: {
    nodes: ArticleSlug[];
  };
};

export type FetchAllPostsSlugReturn = () => Promise<ArticleSlug[]>;
