import type {
  AboutPage,
  Article,
  Blog,
  BlogPosting,
  ContactPage,
  Graph,
  WebPage,
} from 'schema-dts';
import type { Dates } from '../../types';
import { CONFIG } from '../config';
import { ROUTES } from '../constants';

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
    '@id': `${CONFIG.url}/#blog`,
    '@type': 'Blog',
    author: { '@id': `${CONFIG.url}/#branding` },
    creator: { '@id': `${CONFIG.url}/#branding` },
    editor: { '@id': `${CONFIG.url}/#branding` },
    blogPost: isSinglePage ? { '@id': `${CONFIG.url}/#article` } : undefined,
    inLanguage: locale,
    isPartOf: isSinglePage
      ? {
          '@id': `${CONFIG.url}${slug}`,
        }
      : undefined,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: isSinglePage
      ? undefined
      : { '@id': `${CONFIG.url}${slug}` },
  };
};

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
    '@id': `${CONFIG.url}/#${id}`,
    '@type': singlePageSchemaType[kind],
    name: title,
    description,
    articleBody: content,
    author: { '@id': `${CONFIG.url}/#branding` },
    commentCount: commentsCount,
    copyrightYear: publicationDate.getFullYear(),
    creator: { '@id': `${CONFIG.url}/#branding` },
    dateCreated: publicationDate.toISOString(),
    dateModified: updateDate?.toISOString(),
    datePublished: publicationDate.toISOString(),
    editor: { '@id': `${CONFIG.url}/#branding` },
    headline: title,
    image: cover,
    inLanguage: locale,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    thumbnailUrl: cover,
    isPartOf:
      kind === 'post'
        ? {
            '@id': `${CONFIG.url}${ROUTES.BLOG}`,
          }
        : undefined,
    mainEntityOfPage: { '@id': `${CONFIG.url}${slug}` },
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
    '@id': `${CONFIG.url}${slug}`,
    '@type': 'WebPage',
    breadcrumb: { '@id': `${CONFIG.url}/#breadcrumb` },
    lastReviewed: updateDate,
    name: title,
    description,
    inLanguage: locale,
    reviewedBy: { '@id': `${CONFIG.url}/#branding` },
    url: `${CONFIG.url}${slug}`,
    isPartOf: {
      '@id': `${CONFIG.url}`,
    },
  };
};

export const getSchemaJson = (graphs: Graph['@graph']): Graph => {
  return {
    '@context': 'https://schema.org',
    '@graph': graphs,
  };
};
