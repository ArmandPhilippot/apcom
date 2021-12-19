import { PageInfo, Slug } from './app';
import { ArticlePreview, RawArticlePreview } from './articles';

export type PostsList = {
  posts: ArticlePreview[];
  pageInfo: PageInfo;
};

export type PostsListEdges = {
  cursor: string;
  node: RawArticlePreview;
};

export type RawPostsList = {
  posts: {
    edges: PostsListEdges[];
    pageInfo: PageInfo;
  };
};

export type AllPostsSlug = {
  posts: {
    nodes: Slug[];
  };
};

export type BlogPageProps = {
  fallback: PostsList;
};
