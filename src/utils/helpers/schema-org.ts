import type {
  AboutPage,
  Blog,
  BlogPosting,
  BreadcrumbList,
  Comment as CommentSchema,
  ContactPage,
  Duration,
  Graph,
  ListItem,
  Person,
  SearchAction,
  SearchResultsPage,
  WebPage,
  WebSite,
} from 'schema-dts';
import { CONFIG } from '../config';
import {
  ARTICLE_ID,
  AUTHOR_ID,
  COMMENTS_SECTION_ID,
  COMMENT_ID_PREFIX,
  ROUTES,
} from '../constants';
import { trimTrailingChars } from './strings';

const host = trimTrailingChars(CONFIG.url, '/');

/**
 * Retrieve a Person schema in JSON-LD format for the website owner.
 *
 * @returns {Person} A Person graph.
 */
export const getAuthorGraph = (): Person => {
  return {
    '@type': 'Person',
    '@id': `${host}#${AUTHOR_ID}`,
    givenName: CONFIG.name.split(' ')[0],
    image: `${host}/armand-philippot.jpg`,
    jobTitle: CONFIG.baseline,
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'French',
        alternateName: 'fr',
      },
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en',
      },
      {
        '@type': 'Language',
        name: 'Spanish',
        alternateName: 'es',
      },
    ],
    nationality: {
      '@type': 'Country',
      name: 'France',
    },
    name: CONFIG.name,
    url: host,
  };
};

export type WebSiteData = {
  /**
   * A description of the website.
   */
  description: string;
  /**
   * The website title.
   */
  title: string;
};

export type CustomSearchAction = SearchAction & {
  'query-input': string;
};

/**
 * Retrieve the Website schema in JSON-LD format.
 *
 * @param {WebSiteData} data - The website data.
 * @returns {Website} A Website graph.
 */
export const getWebSiteGraph = ({
  description,
  title,
}: WebSiteData): WebSite => {
  const searchAction: CustomSearchAction = {
    '@type': 'SearchAction',
    query: 'required',
    'query-input': 'required name=query',
    target: `${host}${ROUTES.SEARCH}?s={query}`,
  };

  return {
    '@type': 'WebSite',
    '@id': host,
    potentialAction: searchAction,
    url: host,
    author: { '@id': `${host}#${AUTHOR_ID}` },
    copyrightHolder: { '@id': `${host}#${AUTHOR_ID}` },
    copyrightYear: Number(CONFIG.copyright.startYear),
    creator: { '@id': `${host}#${AUTHOR_ID}` },
    description,
    editor: { '@id': `${host}#${AUTHOR_ID}` },
    image: `${host}/icon.svg`,
    inLanguage: [
      {
        '@type': 'Language',
        name: 'French',
        alternateName: 'fr',
      },
    ],
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    name: title,
    publisher: { '@id': `${host}#${AUTHOR_ID}` },
    thumbnailUrl: `${host}/icon.svg`,
  };
};

export type BreadcrumbItemData = {
  label: string;
  position: number;
  slug: string;
};

/**
 * Retrieve the BreadcrumbItem schema in JSON-LD format.
 *
 * @param {BreadcrumbItemData} data - The item data.
 * @returns {ListItem} A ListItem graph.
 */
export const getBreadcrumbItemGraph = ({
  label,
  position,
  slug,
}: BreadcrumbItemData): ListItem => {
  return {
    '@type': 'ListItem',
    item: {
      '@id': slug === ROUTES.HOME ? host : `${host}${slug}`,
      name: label,
    },
    position,
  };
};

type WebContentsDates = {
  /**
   * A date value in ISO 8601 date format.
   */
  publication?: string;
  /**
   * A date value in ISO 8601 date format..
   */
  update?: string;
};

type WebContentsData = {
  /**
   * The year during which the claimed copyright was first asserted.
   */
  copyrightYear?: number;
  /**
   * The URL of the creative work cover.
   */
  cover?: string;
  /**
   * A description of the contents.
   */
  description: string;
  /**
   * The publication date and maybe the update date.
   */
  dates?: WebContentsDates;
  /**
   * Approximate time it usually takes to work through the contents.
   */
  readingTime?: Duration;
  /**
   * The page slug.
   */
  slug: string;
  /**
   * The contents title.
   */
  title: string;
};

export type WebPageData = WebContentsData & {
  /**
   * The breadcrumbs schema.
   */
  breadcrumb?: BreadcrumbList;
};

/**
 * Retrieve the WebPage schema in JSON-LD format.
 *
 * @param {WebPageData} data - The page data.
 * @returns {WebPage} A WebPage graph.
 */
export const getWebPageGraph = ({
  breadcrumb,
  copyrightYear,
  cover,
  dates,
  description,
  readingTime,
  slug,
  title,
}: WebPageData): WebPage => {
  return {
    '@id': `${host}${slug}`,
    '@type': 'WebPage',
    author: { '@id': `${host}#${AUTHOR_ID}` },
    breadcrumb,
    copyrightHolder: { '@id': `${host}#${AUTHOR_ID}` },
    copyrightYear,
    dateCreated: dates?.publication,
    dateModified: dates?.update,
    datePublished: dates?.publication,
    description,
    editor: { '@id': `${host}#${AUTHOR_ID}` },
    headline: title,
    inLanguage: [
      {
        '@type': 'Language',
        name: 'French',
        alternateName: 'fr',
      },
    ],
    isAccessibleForFree: true,
    isPartOf: { '@id': host },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    lastReviewed: dates?.update,
    name: title,
    publisher: { '@id': `${host}#${AUTHOR_ID}` },
    reviewedBy: { '@id': `${host}#${AUTHOR_ID}` },
    timeRequired: readingTime,
    thumbnailUrl: cover,
    url: `${host}${slug}`,
  };
};

/**
 * Retrieve the AboutPage schema in JSON-LD format.
 *
 * @param {WebPageData} data - The page data.
 * @returns {AboutPage} A AboutPage graph.
 */
export const getAboutPageGraph = (data: WebPageData): AboutPage => {
  return {
    ...getWebPageGraph(data),
    '@type': 'AboutPage',
  };
};

/**
 * Retrieve the ContactPage schema in JSON-LD format.
 *
 * @param {WebPageData} data - The page data.
 * @returns {ContactPage} A ContactPage graph.
 */
export const getContactPageGraph = (data: WebPageData): ContactPage => {
  return {
    ...getWebPageGraph(data),
    '@type': 'ContactPage',
  };
};

/**
 * Retrieve the SearchResultsPage schema in JSON-LD format.
 *
 * @param {WebPageData} data - The page data.
 * @returns {SearchResultsPage} A SearchResultsPage graph.
 */
export const getSearchResultsPageGraph = (
  data: WebPageData
): SearchResultsPage => {
  return {
    ...getWebPageGraph(data),
    '@type': 'SearchResultsPage',
  };
};

export type BlogData = WebContentsData & {
  posts?: Blog['blogPost'];
};

/**
 * Retrieve the Blog schema in JSON-LD format.
 *
 * @param {BlogData} data - The blog data.
 * @returns {Blog} A Blog graph.
 */
export const getBlogGraph = ({
  copyrightYear,
  cover,
  dates,
  description,
  posts,
  readingTime,
  slug,
  title,
}: BlogData): Blog => {
  return {
    '@type': 'Blog',
    '@id': `${host}${slug}`,
    author: { '@id': `${host}#${AUTHOR_ID}` },
    blogPost: posts,
    copyrightHolder: { '@id': `${host}#${AUTHOR_ID}` },
    copyrightYear,
    dateCreated: dates?.publication,
    dateModified: dates?.update,
    datePublished: dates?.publication,
    description,
    editor: { '@id': `${host}#${AUTHOR_ID}` },
    headline: title,
    inLanguage: [
      {
        '@type': 'Language',
        name: 'French',
        alternateName: 'fr',
      },
    ],
    isAccessibleForFree: true,
    isPartOf: { '@id': host },
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    name: title,
    publisher: { '@id': `${host}#${AUTHOR_ID}` },
    timeRequired: readingTime,
    thumbnailUrl: cover,
    url: `${host}${slug}`,
  };
};

export type BlogPostingData = WebContentsData & {
  /**
   * The author of the article.
   */
  author?: Person;
  /**
   * The article body.
   */
  body?: string;
  /**
   * The comments on this creative work.
   */
  comment?: CommentSchema[];
  /**
   * The number of comments on this creative work.
   */
  commentCount?: number;
  /**
   * A comma separated list of keywords.
   */
  keywords?: string;
  /**
   * The number of words in the article.
   */
  wordCount?: number;
};

/**
 * Retrieve the BlogPosting schema in JSON-LD format.
 *
 * @param {BlogPostingData} data - The blog posting data.
 * @returns {BlogPosting} A BlogPosting graph.
 */
export const getBlogPostingGraph = ({
  author,
  body,
  comment,
  commentCount,
  copyrightYear,
  cover,
  dates,
  description,
  keywords,
  readingTime,
  slug,
  title,
  wordCount,
}: BlogPostingData): BlogPosting => {
  return {
    '@type': 'BlogPosting',
    '@id': `${host}${slug}#${ARTICLE_ID}`,
    articleBody: body,
    author: author ?? { '@id': `${host}#${AUTHOR_ID}` },
    comment,
    commentCount,
    copyrightHolder: author ?? { '@id': `${host}#${AUTHOR_ID}` },
    copyrightYear,
    dateCreated: dates?.publication,
    dateModified: dates?.update,
    datePublished: dates?.publication,
    description,
    discussionUrl: comment
      ? `${host}${slug}#${COMMENTS_SECTION_ID}`
      : undefined,
    editor: author ?? { '@id': `${host}#${AUTHOR_ID}` },
    headline: title,
    image: cover,
    inLanguage: [
      {
        '@type': 'Language',
        name: 'French',
        alternateName: 'fr',
      },
    ],
    isAccessibleForFree: true,
    isPartOf: { '@id': `${host}${ROUTES.BLOG}#${ARTICLE_ID}` },
    keywords,
    license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
    mainEntityOfPage: { '@id': `${host}${slug}` },
    name: title,
    publisher: { '@id': `${host}#${AUTHOR_ID}` },
    timeRequired: readingTime,
    thumbnailUrl: cover,
    url: `${host}${slug}`,
    wordCount,
  };
};

export type CommentData = {
  /**
   * The slug of the commented article.
   */
  articleSlug: string;
  /**
   * The author of the comment.
   */
  author: Person;
  /**
   * The comment body.
   */
  body: string;
  /**
   * The comment id.
   */
  id: string;
  /**
   * The id of the parent.
   */
  parentId?: string;
  /**
   * A date value in ISO 8601 date format.
   */
  publishedAt: string;
};

/**
 * Retrieve the Comment schema in JSON-LD format.
 *
 * @param {CommentData} data - The comment data.
 * @returns {CommentSchema} A Comment graph.
 */
export const getCommentGraph = ({
  articleSlug,
  author,
  body,
  id,
  parentId,
  publishedAt,
}: CommentData): CommentSchema => {
  return {
    '@id': `${host}${articleSlug}#${COMMENT_ID_PREFIX}${id}`,
    '@type': 'Comment',
    about: { '@id': `${host}/${articleSlug}#${ARTICLE_ID}` },
    author,
    creator: author,
    dateCreated: publishedAt,
    datePublished: publishedAt,
    parentItem: parentId
      ? { '@id': `${host}${articleSlug}#${COMMENT_ID_PREFIX}${parentId}` }
      : { '@id': `${host}/${articleSlug}#${ARTICLE_ID}` },
    text: body,
  };
};

/**
 * Retrieve a schema in JSON-LD format from the given graphs.
 *
 * @param {Graph['@graph']} graphs - The schema graphs.
 * @returns {CommentSchema} The schema in JSON-LD format.
 */
export const getSchemaFrom = (graphs: Graph['@graph']): Graph => {
  return {
    '@context': 'https://schema.org',
    '@graph': [getAuthorGraph(), ...graphs],
  };
};
