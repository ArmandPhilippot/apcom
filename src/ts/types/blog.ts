import { PageInfo, Slug } from './app';
import { ArticlePreview, RawArticlePreview } from './articles';
import { ThematicPreview, TopicPreview } from './taxonomies';

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
  allThematics: ThematicPreview[];
  allTopics: TopicPreview[];
  firstPosts: PostsList;
  totalPosts: number;
};
