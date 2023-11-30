import type {
  AboutPage,
  Article,
  Blog,
  BlogPosting,
  Comment as CommentSchema,
  ContactPage,
  Graph,
  WebPage,
} from 'schema-dts';
import type { Dates, SingleComment } from '../../types';
import { CONFIG } from '../config';
import { ROUTES } from '../constants';
import { trimTrailingChars } from './strings';

const host = trimTrailingChars(CONFIG.url, '/');

export type GetBlogSchemaProps = {
  /**
   * True if the page is part of the blog.
   */
  isSinglePage: boolean;
  /**
   * The page locale.
   */
  locale: string;
  /**
   * The page slug with a leading slash.
   */
  slug: string;
};

/**
 * Retrieve the JSON for Blog schema.
 *
 * @param props - The page data.
 * @returns {Blog} The JSON for Blog schema.
 */
export const getBlogSchema = ({
  isSinglePage,
  locale,
  slug,
}: GetBlogSchemaProps): Blog => {
  return {
    '@id': `${host}/#blog`,
    '@type': 'Blog',
    author: { '@id': `${host}/#branding` },
    creator: { '@id': `${host}/#branding` },
    editor: { '@id': `${host}/#branding` },
    blogPost: isSinglePage ? { '@id': `${host}/#article` } : undefined,
    inLanguage: locale,
    isPartOf: isSinglePage
      ? {
          '@id': `${host}/${slug}`,
        }
      : undefined,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: isSinglePage ? undefined : { '@id': `${host}/${slug}` },
  };
};

/**
 * Retrieve the JSON for Comment schema.
 *
 * @param props - The comments.
 * @returns {CommentSchema[]} The JSON for Comment schema.
 */
export const getCommentsSchema = (comments: SingleComment[]): CommentSchema[] =>
  comments.map((comment) => {
    return {
      '@context': 'https://schema.org',
      '@id': `${CONFIG.url}/#comment-${comment.id}`,
      '@type': 'Comment',
      parentItem: comment.parentId
        ? { '@id': `${CONFIG.url}/#comment-${comment.parentId}` }
        : undefined,
      about: { '@type': 'Article', '@id': `${CONFIG.url}/#article` },
      author: {
        '@type': 'Person',
        name: comment.meta.author.name,
        image: comment.meta.author.avatar?.src,
        url: comment.meta.author.website,
      },
      creator: {
        '@type': 'Person',
        name: comment.meta.author.name,
        image: comment.meta.author.avatar?.src,
        url: comment.meta.author.website,
      },
      dateCreated: comment.meta.date,
      datePublished: comment.meta.date,
      text: comment.content,
    };
  });

export type SinglePageSchemaReturn = {
  about: AboutPage;
  contact: ContactPage;
  page: Article;
  post: BlogPosting;
};

export type SinglePageSchemaKind = keyof SinglePageSchemaReturn;

export type GetSinglePageSchemaProps<T extends SinglePageSchemaKind> = {
  /**
   * The number of comments.
   */
  commentsCount?: number;
  /**
   * The page content.
   */
  content?: string;
  /**
   * The url of the cover.
   */
  cover?: string;
  /**
   * The page dates.
   */
  dates: Dates;
  /**
   * The page description.
   */
  description: string;
  /**
   * The page id.
   */
  id: string;
  /**
   * The page kind.
   */
  kind: T;
  /**
   * The page locale.
   */
  locale: string;
  /**
   * The page slug with a leading slash.
   */
  slug: string;
  /**
   * The page title.
   */
  title: string;
};

/**
 * Retrieve the JSON schema depending on the page kind.
 *
 * @param props - The page data.
 * @returns {SinglePageSchemaReturn[T]} - Either AboutPage, ContactPage, Article or BlogPosting schema.
 */
export const getSinglePageSchema = <T extends SinglePageSchemaKind>({
  commentsCount,
  content,
  cover,
  dates,
  description,
  id,
  kind,
  locale,
  title,
  slug,
}: GetSinglePageSchemaProps<T>): SinglePageSchemaReturn[T] => {
  const publicationDate = new Date(dates.publication);
  const updateDate = dates.update ? new Date(dates.update) : undefined;
  const singlePageSchemaType = {
    about: 'AboutPage',
    contact: 'ContactPage',
    page: 'Article',
    post: 'BlogPosting',
  };

  return {
    '@id': `${host}/#${id}`,
    '@type': singlePageSchemaType[kind],
    name: title,
    description,
    articleBody: content,
    author: { '@id': `${host}/#branding` },
    commentCount: commentsCount,
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${host}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate?.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${host}/#branding` },
    headline: title,
    image: cover,
    inLanguage: locale,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    thumbnailUrl: cover,
    isPartOf:
      kind === 'post'
        ? {
            '@id': `${host}/${ROUTES.BLOG}`,
          }
        : undefined,
    mainEntityOfPage: { '@id': `${host}/${slug}` },
  } as SinglePageSchemaReturn[T];
};

export type GetWebPageSchemaProps = {
  /**
   * The page description.
   */
  description: string;
  /**
   * The page locale.
   */
  locale: string;
  /**
   * The page slug.
   */
  slug: string;
  /**
   * The page title.
   */
  title: string;
  /**
   * The page last update.
   */
  updateDate?: string;
};

/**
 * Retrieve the JSON for WebPage schema.
 *
 * @param props - The page data.
 * @returns {WebPage} The JSON for WebPage schema.
 */
export const getWebPageSchema = ({
  description,
  locale,
  slug,
  title,
  updateDate,
}: GetWebPageSchemaProps): WebPage => {
  return {
    '@id': `${host}/${slug}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${host}/#breadcrumb` },
    lastReviewed: updateDate,
    name: title,
    description,
    inLanguage: locale,
    reviewedBy: { '@id': `${host}/#branding` },
    url: `${host}/${slug}`,
    isPartOf: {
      '@id': `${host}`,
    },
  };
};

export const getSchemaJson = (graphs: Graph['@graph']): Graph => {
  return {
    '@context': 'https://schema.org',
    '@graph': graphs,
  };
};
