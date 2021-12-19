import { ContentParts, Dates } from './app';

export type Page = {
  content: string;
  dates: Dates;
  intro: string;
  title: string;
};

export type RawPage = {
  contentParts: ContentParts;
  date: string;
  modified: string;
  title: string;
};

export type PageBy = {
  pageBy: RawPage;
};

export type PageProps = {
  page: Page;
};
