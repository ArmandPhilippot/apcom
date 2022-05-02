/**
 * Types for raw data coming from GraphQL API.
 */

import { NodeResponse, PageInfo } from '@services/graphql/api';
import { AuthorKind } from './app';

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
  readingTime: number;
  wordsCount: number;
};

export type RawAuthor<T extends AuthorKind> = {
  description?: T extends 'page' ? string | undefined : never;
  gravatarUrl?: string;
  name: string;
  url?: string;
};

export type RawComment = {
  approved: boolean;
  author: NodeResponse<RawAuthor<'comment'>>;
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
  author: NodeResponse<RawAuthor<'page'>>;
  contentParts: ContentParts;
  databaseId: number;
  date: string;
  featuredImage: NodeResponse<RawCover> | null;
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
  'databaseId' | 'slug' | 'title'
>;

export type RawTopic = RawPage & {
  acfTopics: ACFTopics;
};

export type RawTopicPreview = Pick<RawTopic, 'databaseId' | 'slug' | 'title'>;

export type TotalItems = {
  pageInfo: Pick<PageInfo, 'total'>;
};
