import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { PostBy } from './articles';
import { AllPostsSlug, RawPostsList } from './blog';
import { CommentData, CreateComment } from './comments';
import { ContactData, SendEmail } from './contact';
import {
  AllSubjects,
  AllSubjectsSlug,
  AllThematics,
  AllThematicsSlug,
  SubjectBy,
  ThematicBy,
} from './taxonomies';

//==============================================================================
// Next
//==============================================================================

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

//==============================================================================
// API
//==============================================================================

export type VariablesType<T> = T extends PostBy | SubjectBy | ThematicBy
  ? Slug
  : T extends RawPostsList
  ? CursorPagination
  : T extends CreateComment
  ? CommentData
  : T extends SendEmail
  ? ContactData
  : null;

export type RequestType =
  | AllPostsSlug
  | AllSubjects
  | AllSubjectsSlug
  | AllThematics
  | AllThematicsSlug
  | CreateComment
  | PostBy
  | SubjectBy
  | ThematicBy
  | RawPostsList
  | SendEmail;

//==============================================================================
// Globals
//==============================================================================

export type ButtonKind = 'primary' | 'secondary' | 'tertiary';

export type ButtonPosition = 'left' | 'right' | 'center';

export type ContentParts = {
  afterMore: string;
  beforeMore: string;
};

export type CursorPagination = {
  first: number;
  after: string;
};

export type Dates = {
  publication: string;
  update: string;
};

export type Heading = {
  depth: number;
  id: string;
  children: Heading[];
  title: string;
};

export type Meta = {
  title: string;
  publishedOn: string;
  updatedOn: string;
};

export type ProjectMeta = Meta & {
  license: string;
  repos?: {
    github?: string;
    gitlab?: string;
  };
  technologies?: string[];
};

export type PageInfo = {
  endCursor: string;
  hasNextPage: boolean;
};

export type Project = {
  cover: string;
  id: string;
  intro: string;
  meta: ProjectMeta;
  slug: string;
};

export type Slug = {
  slug: string;
};

export type TitleLevel = 2 | 3 | 4 | 5 | 6;
