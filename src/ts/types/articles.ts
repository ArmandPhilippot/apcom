import { ContentParts, Dates } from './app';
import { Comment, CommentsNode } from './comments';
import { Cover, RawCover } from './cover';
import { SEO } from './seo';
import { RawTopicPreview, TopicPreview, ThematicPreview } from './taxonomies';

export type ArticleAuthor = {
  firstName: string;
  lastName: string;
  name: string;
};

export type RawACFPosts = {
  postsInTopic: RawTopicPreview[] | null;
  postsInThematic: ThematicPreview[] | null;
};

export type ACFPosts = {
  postsInTopic: TopicPreview[] | null;
  postsInThematic: ThematicPreview[] | null;
};

export type ArticleMeta = {
  author?: ArticleAuthor;
  commentCount?: number;
  dates?: Dates;
  topics?: TopicPreview[];
  thematics?: ThematicPreview[];
  website?: string;
};

export type Article = {
  author: ArticleAuthor;
  commentCount: number | null;
  comments: Comment[];
  content: string;
  databaseId: number;
  dates: Dates;
  featuredImage: Cover;
  id: string;
  intro: string;
  seo: SEO;
  topics: TopicPreview[] | [];
  thematics: ThematicPreview[] | [];
  title: string;
};

export type RawArticle = Pick<
  Article,
  'commentCount' | 'databaseId' | 'id' | 'seo' | 'title'
> & {
  acfPosts: RawACFPosts;
  author: { node: ArticleAuthor };
  comments: CommentsNode;
  contentParts: ContentParts;
  date: string;
  featuredImage: RawCover;
  modified: string;
};

export type ArticlePreview = Pick<
  Article,
  'commentCount' | 'dates' | 'id' | 'intro' | 'topics' | 'thematics' | 'title'
> & { featuredImage: Cover; slug: string };

export type RawArticlePreview = Pick<
  Article,
  'commentCount' | 'id' | 'title'
> & {
  acfPosts: ACFPosts;
  contentParts: Pick<ContentParts, 'beforeMore'>;
  date: string;
  featuredImage: RawCover;
  modified: string;
  slug: string;
};

export type PostBy = {
  postBy: RawArticle;
};

export type ArticleProps = {
  post: Article;
};
