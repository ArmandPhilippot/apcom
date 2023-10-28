import type { NextPage } from 'next';
import type { AppProps as NextAppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { MessageFormatElement } from 'react-intl';
import type { VALID_THEMES } from '../utils/constants';

export type NextPageWithLayoutOptions = {
  withExtraPadding?: boolean;
  isHome?: boolean;
  useGrid?: boolean;
};

export type NextPageWithLayout<T = object> = NextPage<T> & {
  getLayout?: (
    page: ReactElement,
    options: NextPageWithLayoutOptions
  ) => ReactNode;
};

// modified version - allows custom pageProps type, falling back to 'unknown'
type AppProps<P = unknown> = {
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;

type CustomPageProps = {
  translation: Record<string, string> | Record<string, MessageFormatElement[]>;
};

export type AppPropsWithLayout = AppProps<CustomPageProps> & {
  Component: NextPageWithLayout;
};

export type ContentKind =
  | 'article'
  | 'comment'
  | 'page'
  | 'project'
  | 'thematic'
  | 'topic';

export type Author<T extends ContentKind> = {
  avatar?: Image;
  description?: T extends 'comment' ? never : string;
  name: string;
  website?: string;
};

export type CommentMeta = {
  author: Author<'comment'>;
  date: string;
};

export type SingleComment = {
  approved: boolean;
  content: string;
  id: number;
  meta: CommentMeta;
  parentId?: number;
  replies: SingleComment[];
};

export type Dates = {
  publication: string;
  update?: string;
};

export type Image = {
  alt: string;
  height: number;
  src: string;
  title?: string;
  width: number;
};

export type Repos = {
  github?: string;
  gitlab?: string;
};

export type SEO = {
  description: string;
  title: string;
};

export type PageKind = Exclude<ContentKind, 'comment'>;

export type Meta<T extends PageKind> = {
  articles?: T extends 'thematic' | 'topic' ? Article[] : never;
  author?: T extends 'article' | 'page' ? Author<T> : never;
  commentsCount?: T extends 'article' ? number : never;
  cover?: Image;
  dates: Dates;
  license?: T extends 'project' ? string : never;
  repos?: T extends 'project' ? Repos : never;
  seo: SEO;
  tagline?: T extends 'project' ? string : never;
  technologies?: T extends 'project' ? string[] : never;
  thematics?: T extends 'article' | 'topic' ? PageLink[] : never;
  topics?: T extends 'article' | 'thematic' ? PageLink[] : never;
  website?: T extends 'topic' ? string : never;
  wordsCount: number;
};

export type Page<T extends PageKind> = {
  content: string;
  id: number | string;
  intro: string;
  meta: Meta<T>;
  slug: string;
  title: string;
};

export type PageLink = {
  id: number;
  logo?: Image;
  name: string;
  url: string;
};

export type Article = Page<'article'>;
export type ArticleCard = Pick<Article, 'id' | 'slug' | 'title'> &
  Pick<Meta<'article'>, 'cover' | 'dates'>;
export type Project = Page<'project'>;
export type ProjectPreview = Omit<Page<'project'>, 'content'>;
export type ProjectCard = Pick<Page<'project'>, 'id' | 'slug' | 'title'> & {
  meta: Pick<Meta<'project'>, 'cover' | 'dates' | 'tagline' | 'technologies'>;
};
export type Thematic = Page<'thematic'>;
export type Topic = Page<'topic'>;

export type Slug = {
  slug: string;
};

export type Position = 'bottom' | 'center' | 'left' | 'right' | 'top';

/** Spacing keys defined has CSS variables */
export type Spacing = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export type Validator<T> = (value: unknown) => value is T;

export type AckeeTrackerValue = 'full' | 'partial';

export type Theme = (typeof VALID_THEMES)[number];
