import { Cover, CoverResponse } from './cover';
import { SubjectPreview, ThematicPreview } from './taxonomies';

export type ArticleDates = {
  publication: string;
  update: string;
};

export type ArticlePreviewResponse = {
  acfPosts: {
    postsInSubject: SubjectPreview[] | null;
    postsInThematics: ThematicPreview[] | null;
  };
  commentCount: number;
  contentParts: {
    beforeMore: string;
  };
  databaseId: number;
  date: string;
  featuredImage: CoverResponse | null;
  id: string;
  modified: string;
  slug: string;
  title: string;
};

export type ArticlePreview = {
  commentCount: number;
  content: string;
  databaseId: number;
  date: ArticleDates;
  featuredImage?: Cover | object;
  id: string;
  slug: string;
  subjects: SubjectPreview[] | [];
  thematics: ThematicPreview[] | [];
  title: string;
};
