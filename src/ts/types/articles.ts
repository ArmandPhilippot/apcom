import { Comment, CommentsResponse } from './comments';
import { Cover, CoverResponse } from './cover';
import { SEO } from './seo';
import { SubjectPreview, ThematicPreview } from './taxonomies';

export type ArticleDates = {
  publication: string;
  update: string;
};

export type ArticlePreviewResponse = {
  acfPosts: {
    postsInSubject: SubjectPreview[] | null;
    postsInThematic: ThematicPreview[] | null;
  };
  commentCount: number | null;
  contentParts: {
    beforeMore: string;
  };
  databaseId: number;
  date: string;
  featuredImage: CoverResponse;
  id: string;
  modified: string;
  slug: string;
  title: string;
};

export type ArticlePreview = {
  commentCount: number | null;
  content: string;
  databaseId: number;
  date: ArticleDates;
  featuredImage: Cover | null;
  id: string;
  slug: string;
  subjects: SubjectPreview[] | [];
  thematics: ThematicPreview[] | [];
  title: string;
};

export type ArticleResponse = ArticlePreviewResponse & {
  comments: CommentsResponse;
  contentParts: {
    afterMore: string;
  };
  seo: SEO;
};

export type Article = ArticlePreview & {
  comments: Comment[];
  intro: string;
  seo: SEO;
};

export type PostByResponse = {
  postBy: ArticleResponse;
};

export type FetchPostByReturn = (slug: string) => Promise<PostByResponse>;

export type GetPostByReturn = (slug: string) => Promise<Article>;

export type ArticleProps = {
  post: Article;
};

export type ArticleSlug = {
  slug: string;
};
