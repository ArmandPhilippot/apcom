/**
 * Types for raw data coming from GraphQL API.
 */

import { ContentKind } from './app';
import { GraphQLNode, GraphQLPageInfo } from './graphql/generics';

export type ACFPosts = {
  postsInThematic?: RawThematicPreview[];
  postsInTopic?: RawTopicPreview[];
};

export type ACFThematics = {
  postsInThematic: RawArticle[];
};

export type ACFTopics = {
  officialWebsite: string;
  postsInTopic: RawArticle[];
};

export type ContentParts = {
  afterMore: string;
  beforeMore: string;
};

export type Info = {
  wordsCount: number;
};

export type RawAuthor<T extends ContentKind> = {
  description?: T extends 'comment' ? never : string;
  gravatarUrl?: string;
  name: string;
  url?: string;
};

export type RawComment = {
  approved: boolean;
  author: GraphQLNode<RawAuthor<'comment'>>;
  content: string;
  databaseId: number;
  date: string;
  parentDatabaseId: number;
};

export type RawCover = {
  altText: string;
  mediaDetails: {
    width: number;
    height: number;
  };
  sourceUrl: string;
  title?: string;
};

export type RawArticle = RawPage & {
  acfPosts: ACFPosts;
  commentCount: number | null;
};

export type RawArticlePreview = Pick<
  RawArticle,
  'databaseId' | 'date' | 'featuredImage' | 'slug' | 'title'
>;

export type RawPage = {
  author?: GraphQLNode<RawAuthor<'page'>>;
  contentParts: ContentParts;
  databaseId: number;
  date: string;
  featuredImage: GraphQLNode<RawCover> | null;
  info: Info;
  modified: string;
  seo?: RawSEO;
  slug: string;
  title: string;
};

export type RawSEO = {
  metaDesc: string;
  title: string;
};

export type RawThematic = RawPage & {
  acfThematics: ACFThematics;
};

export type RawThematicPreview = Pick<
  RawThematic,
  'databaseId' | 'featuredImage' | 'slug' | 'title'
>;

export type RawTopic = RawPage & {
  acfTopics: ACFTopics;
};

export type RawTopicPreview = Pick<
  RawTopic,
  'databaseId' | 'featuredImage' | 'slug' | 'title'
>;

export type TotalItems = {
  pageInfo: Pick<GraphQLPageInfo, 'total'>;
};
