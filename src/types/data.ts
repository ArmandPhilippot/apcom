import type { StaticImageData } from 'next/image';
import type { Nullable } from './generics';
import type { GraphQLNode } from './gql';

export type SlugNode = {
  slug: string;
};

//===========================================================================
// Data from WordPress
//===========================================================================

type WPSeo = {
  metaDesc: string;
  title: string;
};

type WPCommentAuthorAvatar = {
  height: number;
  url: string;
  width: number;
};

type WPCommentAuthor = {
  avatar: Nullable<WPCommentAuthorAvatar>;
  name: string;
  url: Nullable<string>;
};

export type WPCommentStatus = 'APPROVE' | 'HOLD' | 'SPAM' | 'TRASH';

export type WPComment = {
  approved: boolean;
  author: GraphQLNode<WPCommentAuthor>;
  content: string;
  databaseId: number;
  date: string;
  parentDatabaseId: number;
  status: WPCommentStatus;
};

type WPContentParts = {
  afterMore: string;
  beforeMore: string;
};

export type WPImage = {
  altText: Nullable<string>;
  mediaDetails: {
    height: number;
    width: number;
  };
  sourceUrl: string;
  title: Nullable<string>;
};

type WPInfo = { wordsCount: number };

type WPContent = {
  contentParts: WPContentParts;
  databaseId: number;
  date: string;
  featuredImage: Nullable<GraphQLNode<WPImage>>;
  modified: string;
  seo: WPSeo;
  slug: string;
  title: string;
};

export type WPPage = WPContent & {
  info: WPInfo;
};

type WPPostAuthor = { name: string };

type WPAcfPosts = {
  postsInThematic: Nullable<WPThematicPreview[]>;
  postsInTopic: Nullable<WPTopicPreview[]>;
};

export type WPPost = WPContent & {
  acfPosts: Nullable<Partial<WPAcfPosts>>;
  author: GraphQLNode<WPPostAuthor>;
  commentCount: Nullable<number>;
  info: WPInfo;
};

export type WPPostPreview = Pick<
  WPPost,
  | 'commentCount'
  | 'databaseId'
  | 'date'
  | 'featuredImage'
  | 'info'
  | 'modified'
  | 'slug'
  | 'title'
> & {
  acfPosts:
    | Nullable<Pick<WPAcfPosts, 'postsInThematic'>>
    | Nullable<Pick<WPAcfPosts, 'postsInTopic'>>;
  contentParts: Pick<WPContentParts, 'beforeMore'>;
};

export type RecentWPPost = Pick<
  WPPost,
  'date' | 'featuredImage' | 'slug' | 'title'
> & {
  databaseId: number;
};

type WPAcfThematics = {
  postsInThematic: Nullable<WPPostPreview[]>;
};

export type WPThematic = WPContent & {
  acfThematics: Nullable<WPAcfThematics>;
};

export type WPThematicPreview = Pick<
  WPThematic,
  'databaseId' | 'slug' | 'title'
>;

type WPAcfTopics = {
  officialWebsite: Nullable<string>;
  postsInTopic: Nullable<WPPostPreview[]>;
};

export type WPTopic = WPContent & {
  acfTopics: Nullable<WPAcfTopics>;
};

export type WPTopicPreview = Pick<
  WPTopic,
  'databaseId' | 'featuredImage' | 'slug' | 'title'
>;

//===========================================================================
// Data from MDX files
//===========================================================================

export type MDXData = {
  file: string;
  image: MDXImage;
};

export type MDXImage = StaticImageData & {
  alt: string;
  title?: string;
};

export type MDXPageMeta = Omit<PageMeta, 'wordsCount'> & {
  intro: string;
  title: string;
};

export type MDXProjectMeta = Omit<ProjectMeta, 'wordsCount'> & {
  intro: string;
  title: string;
};

//===========================================================================
// Data used in this application
//===========================================================================

export type Dates = {
  publication: string;
  update?: string;
};

export type SEO = {
  description: string;
  title: string;
};

export type Img = {
  alt: string;
  height: number;
  src: string;
  title?: string;
  width: number;
};

export type CommentAuthor = {
  avatar?: Omit<Img, 'title'>;
  name: string;
  website?: string;
};

export type CommentMeta = {
  author: CommentAuthor;
  date: string;
};

export type SingleComment = {
  content: string;
  id: number;
  isApproved: boolean;
  meta: CommentMeta;
  parentId?: number;
  replies: SingleComment[];
};

export type PageMeta = {
  cover?: Img;
  dates: Dates;
  seo: SEO;
  wordsCount: number;
};

export type Page = {
  content: string;
  intro: string;
  slug: string;
  title: string;
};

export type PageLink = {
  id: number;
  logo?: Img;
  name: string;
  url: string;
};

type ArticleMeta = PageMeta & {
  author?: string;
  commentsCount?: number;
  thematics?: PageLink[];
  topics?: PageLink[];
};

export type Article = Page & {
  id: number;
  meta: ArticleMeta;
};

export type ArticlePreview = Pick<Article, 'intro' | 'slug' | 'title'> & {
  id: number;
  meta: Omit<ArticleMeta, 'author' | 'seo' | 'topics'>;
};

export type RecentArticle = Pick<Article, 'slug' | 'title'> &
  Pick<ArticleMeta, 'cover'> & {
    id: number;
    publicationDate: string;
  };

export type Repos = {
  github?: string;
  gitlab?: string;
};

export type ProjectMeta = Omit<PageMeta, 'wordsCount'> & {
  license?: string;
  repos?: Repos;
  tagline?: string;
  technologies?: string[];
};

export type Project = Omit<Page, 'content'> & {
  id: string;
  meta: ProjectMeta;
};

export type ProjectPreview = Omit<Project, 'meta'> & {
  meta: Omit<ProjectMeta, 'license' | 'repos'>;
};

export type ThematicMeta = Omit<PageMeta, 'wordsCount'> & {
  articles?: ArticlePreview[];
  relatedTopics?: PageLink[];
};

export type Thematic = Page & {
  id: number;
  meta: ThematicMeta;
};

export type TopicMeta = Omit<PageMeta, 'wordsCount'> & {
  articles?: ArticlePreview[];
  relatedThematics?: PageLink[];
  website?: string;
};

export type Topic = Page & {
  id: number;
  meta: TopicMeta;
};
