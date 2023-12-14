import { describe, expect, it } from '@jest/globals';
import type { Graph } from 'schema-dts';
import { CONFIG } from '../config';
import {
  ARTICLE_ID,
  AUTHOR_ID,
  COMMENTS_SECTION_ID,
  COMMENT_ID_PREFIX,
  ROUTES,
} from '../constants';
import {
  type WebSiteData,
  getWebSiteGraph,
  type WebPageData,
  getWebPageGraph,
  type BlogData,
  getBlogGraph,
  type BlogPostingData,
  getBlogPostingGraph,
  type CommentData,
  getCommentGraph,
  getAuthorGraph,
  getAboutPageGraph,
  getContactPageGraph,
  getSearchResultsPageGraph,
  getSchemaFrom,
} from './schema-org';
import { trimTrailingChars } from './strings';

const host = trimTrailingChars(CONFIG.url, '/');

describe('getAuthorGraph', () => {
  it('returns a Person schema in JSON-LD format', () => {
    const result = getAuthorGraph();

    expect(result).toStrictEqual({
      '@type': 'Person',
      '@id': `${host}#${AUTHOR_ID}`,
      givenName: 'Armand',
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
      name: 'Armand Philippot',
      url: host,
    });
  });
});

describe('getWebSiteGraph', () => {
  it('returns the WebSite schema in JSON-LD format', () => {
    const data: WebSiteData = {
      description: 'maxime ea et',
      title: 'eius voluptates deserunt',
    };
    const result = getWebSiteGraph(data);

    expect(result).toStrictEqual({
      '@type': 'WebSite',
      '@id': host,
      potentialAction: {
        '@type': 'SearchAction',
        query: 'required',
        'query-input': 'required name=query',
        target: `${host}${ROUTES.SEARCH}?s={query}`,
      },
      url: host,
      author: { '@id': `${host}#${AUTHOR_ID}` },
      copyrightHolder: { '@id': `${host}#${AUTHOR_ID}` },
      copyrightYear: Number(CONFIG.copyright.startYear),
      creator: { '@id': `${host}#${AUTHOR_ID}` },
      description: data.description,
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
      name: data.title,
      publisher: { '@id': `${host}#${AUTHOR_ID}` },
      thumbnailUrl: `${host}/icon.svg`,
    });
  });
});

describe('getWebPageGraph', () => {
  it('returns the WebPage schema in JSON-LD format', () => {
    const data: WebPageData = {
      breadcrumb: undefined,
      copyrightYear: 2011,
      cover: 'https://picsum.photos/640/480',
      dates: {
        publication: '2022-04-21',
        update: '2023-05-02',
      },
      description: 'maxime ea et',
      readingTime: 'PT2M',
      slug: '/harum',
      title: 'eius voluptates deserunt',
    };
    const result = getWebPageGraph(data);

    expect(result).toStrictEqual({
      '@id': `${host}${data.slug}`,
      '@type': 'WebPage',
      author: { '@id': `${host}#${AUTHOR_ID}` },
      breadcrumb: data.breadcrumb,
      copyrightHolder: { '@id': `${host}#${AUTHOR_ID}` },
      copyrightYear: data.copyrightYear,
      dateCreated: data.dates?.publication,
      dateModified: data.dates?.update,
      datePublished: data.dates?.publication,
      description: data.description,
      editor: { '@id': `${host}#${AUTHOR_ID}` },
      headline: data.title,
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
      lastReviewed: data.dates?.update,
      name: data.title,
      publisher: { '@id': `${host}#${AUTHOR_ID}` },
      reviewedBy: { '@id': `${host}#${AUTHOR_ID}` },
      timeRequired: data.readingTime,
      thumbnailUrl: data.cover,
      url: `${host}${data.slug}`,
    });
  });
});

describe('getAboutPageGraph', () => {
  it('returns the AboutPage schema in JSON-LD format', () => {
    const data: WebPageData = {
      breadcrumb: undefined,
      copyrightYear: 2011,
      cover: 'https://picsum.photos/640/480',
      dates: {
        publication: '2022-04-21',
        update: '2023-05-02',
      },
      description: 'maxime ea et',
      readingTime: 'PT2M',
      slug: '/harum',
      title: 'eius voluptates deserunt',
    };
    const result = getAboutPageGraph(data);

    expect(result).toStrictEqual({
      '@id': `${host}${data.slug}`,
      '@type': 'AboutPage',
      author: { '@id': `${host}#${AUTHOR_ID}` },
      breadcrumb: data.breadcrumb,
      copyrightHolder: { '@id': `${host}#${AUTHOR_ID}` },
      copyrightYear: data.copyrightYear,
      dateCreated: data.dates?.publication,
      dateModified: data.dates?.update,
      datePublished: data.dates?.publication,
      description: data.description,
      editor: { '@id': `${host}#${AUTHOR_ID}` },
      headline: data.title,
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
      lastReviewed: data.dates?.update,
      name: data.title,
      publisher: { '@id': `${host}#${AUTHOR_ID}` },
      reviewedBy: { '@id': `${host}#${AUTHOR_ID}` },
      timeRequired: data.readingTime,
      thumbnailUrl: data.cover,
      url: `${host}${data.slug}`,
    });
  });
});

describe('getContactPageGraph', () => {
  it('returns the ContactPage schema in JSON-LD format', () => {
    const data: WebPageData = {
      breadcrumb: undefined,
      copyrightYear: 2011,
      cover: 'https://picsum.photos/640/480',
      dates: {
        publication: '2022-04-21',
        update: '2023-05-02',
      },
      description: 'maxime ea et',
      readingTime: 'PT2M',
      slug: '/harum',
      title: 'eius voluptates deserunt',
    };
    const result = getContactPageGraph(data);

    expect(result).toStrictEqual({
      '@id': `${host}${data.slug}`,
      '@type': 'ContactPage',
      author: { '@id': `${host}#${AUTHOR_ID}` },
      breadcrumb: data.breadcrumb,
      copyrightHolder: { '@id': `${host}#${AUTHOR_ID}` },
      copyrightYear: data.copyrightYear,
      dateCreated: data.dates?.publication,
      dateModified: data.dates?.update,
      datePublished: data.dates?.publication,
      description: data.description,
      editor: { '@id': `${host}#${AUTHOR_ID}` },
      headline: data.title,
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
      lastReviewed: data.dates?.update,
      name: data.title,
      publisher: { '@id': `${host}#${AUTHOR_ID}` },
      reviewedBy: { '@id': `${host}#${AUTHOR_ID}` },
      timeRequired: data.readingTime,
      thumbnailUrl: data.cover,
      url: `${host}${data.slug}`,
    });
  });
});

describe('getSearchResultsPageGraph', () => {
  it('returns the SearchResultsPage schema in JSON-LD format', () => {
    const data: WebPageData = {
      breadcrumb: undefined,
      copyrightYear: 2011,
      cover: 'https://picsum.photos/640/480',
      dates: {
        publication: '2022-04-21',
        update: '2023-05-02',
      },
      description: 'maxime ea et',
      readingTime: 'PT2M',
      slug: '/harum',
      title: 'eius voluptates deserunt',
    };
    const result = getSearchResultsPageGraph(data);

    expect(result).toStrictEqual({
      '@id': `${host}${data.slug}`,
      '@type': 'SearchResultsPage',
      author: { '@id': `${host}#${AUTHOR_ID}` },
      breadcrumb: data.breadcrumb,
      copyrightHolder: { '@id': `${host}#${AUTHOR_ID}` },
      copyrightYear: data.copyrightYear,
      dateCreated: data.dates?.publication,
      dateModified: data.dates?.update,
      datePublished: data.dates?.publication,
      description: data.description,
      editor: { '@id': `${host}#${AUTHOR_ID}` },
      headline: data.title,
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
      lastReviewed: data.dates?.update,
      name: data.title,
      publisher: { '@id': `${host}#${AUTHOR_ID}` },
      reviewedBy: { '@id': `${host}#${AUTHOR_ID}` },
      timeRequired: data.readingTime,
      thumbnailUrl: data.cover,
      url: `${host}${data.slug}`,
    });
  });
});

describe('getBlogGraph', () => {
  it('returns the Blog schema in JSON-LD format', () => {
    const data: BlogData = {
      copyrightYear: 2013,
      cover: 'https://picsum.photos/640/480',
      dates: {
        publication: '2021-07-01',
        update: '2022-12-03',
      },
      description: 'dolorem provident dolores',
      posts: undefined,
      readingTime: 'PT5M',
      slug: '/laboriosam',
      title: 'id odio rerum',
    };
    const result = getBlogGraph(data);

    expect(result).toStrictEqual({
      '@type': 'Blog',
      '@id': `${host}${data.slug}`,
      author: { '@id': `${host}#${AUTHOR_ID}` },
      blogPost: data.posts,
      copyrightHolder: { '@id': `${host}#${AUTHOR_ID}` },
      copyrightYear: data.copyrightYear,
      dateCreated: data.dates?.publication,
      dateModified: data.dates?.update,
      datePublished: data.dates?.publication,
      description: data.description,
      editor: { '@id': `${host}#${AUTHOR_ID}` },
      headline: data.title,
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
      name: data.title,
      publisher: { '@id': `${host}#${AUTHOR_ID}` },
      timeRequired: data.readingTime,
      thumbnailUrl: data.cover,
      url: `${host}${data.slug}`,
    });
  });
});

describe('getBlogPostingGraph', () => {
  it('returns the BlogPosting schema in JSON-LD format', () => {
    const data: BlogPostingData = {
      author: undefined,
      body: 'Veritatis dignissimos rerum quo est.',
      comment: undefined,
      commentCount: 5,
      copyrightYear: 2013,
      cover: 'https://picsum.photos/640/480',
      dates: {
        publication: '2021-07-01',
        update: '2022-12-03',
      },
      description: 'dolorem provident dolores',
      keywords: 'unde, aut',
      readingTime: 'PT5M',
      slug: '/laboriosam',
      title: 'id odio rerum',
      wordCount: 450,
    };
    const result = getBlogPostingGraph(data);

    expect(result).toStrictEqual({
      '@type': 'BlogPosting',
      '@id': `${host}${data.slug}#${ARTICLE_ID}`,
      articleBody: data.body,
      author: { '@id': `${host}#${AUTHOR_ID}` },
      comment: data.comment,
      commentCount: data.commentCount,
      copyrightHolder: { '@id': `${host}#${AUTHOR_ID}` },
      copyrightYear: data.copyrightYear,
      dateCreated: data.dates?.publication,
      dateModified: data.dates?.update,
      datePublished: data.dates?.publication,
      description: data.description,
      discussionUrl: data.comment,
      editor: { '@id': `${host}#${AUTHOR_ID}` },
      headline: data.title,
      image: data.cover,
      inLanguage: [
        {
          '@type': 'Language',
          name: 'French',
          alternateName: 'fr',
        },
      ],
      isAccessibleForFree: true,
      isPartOf: { '@id': `${host}${ROUTES.BLOG}#${ARTICLE_ID}` },
      keywords: data.keywords,
      license: 'https://creativecommons.org/licenses/by-sa/4.0/deed.fr',
      mainEntityOfPage: { '@id': `${host}${data.slug}` },
      name: data.title,
      publisher: { '@id': `${host}#${AUTHOR_ID}` },
      timeRequired: data.readingTime,
      thumbnailUrl: data.cover,
      url: `${host}${data.slug}`,
      wordCount: data.wordCount,
    });
  });

  it('can return a discussion url', () => {
    const data: BlogPostingData = {
      body: 'Veritatis dignissimos rerum quo est.',
      comment: [],
      commentCount: 5,
      description: 'dolorem provident dolores',
      slug: '/laboriosam',
      title: 'id odio rerum',
    };
    const result = getBlogPostingGraph(data);

    expect(result.discussionUrl).toBe(
      `${host}${data.slug}#${COMMENTS_SECTION_ID}`
    );
  });
});

describe('getCommentGraph', () => {
  it('returns the Comment schema in JSON-LD format', () => {
    const data: CommentData = {
      articleSlug: '/maiores',
      author: {
        '@type': 'Person',
        name: 'Horacio_Johns22',
      },
      body: 'Perspiciatis maiores reiciendis tempore.',
      id: 'itaque',
      publishedAt: '2020-10-10',
      parentId: undefined,
    };
    const result = getCommentGraph(data);

    expect(result).toStrictEqual({
      '@id': `${host}${data.articleSlug}#${COMMENT_ID_PREFIX}${data.id}`,
      '@type': 'Comment',
      about: { '@id': `${host}/${data.articleSlug}#${ARTICLE_ID}` },
      author: data.author,
      creator: data.author,
      dateCreated: data.publishedAt,
      datePublished: data.publishedAt,
      parentItem: { '@id': `${host}/${data.articleSlug}#${ARTICLE_ID}` },
      text: data.body,
    });
  });

  it('can return a reference to the comment parent', () => {
    const data: CommentData = {
      articleSlug: '/maiores',
      author: {
        '@type': 'Person',
        name: 'Horacio_Johns22',
      },
      body: 'Perspiciatis maiores reiciendis tempore.',
      id: 'itaque',
      publishedAt: '2020-10-10',
      parentId: 'magnam',
    };
    const result = getCommentGraph(data);

    expect(result).toStrictEqual({
      '@id': `${host}${data.articleSlug}#${COMMENT_ID_PREFIX}${data.id}`,
      '@type': 'Comment',
      about: { '@id': `${host}/${data.articleSlug}#${ARTICLE_ID}` },
      author: data.author,
      creator: data.author,
      dateCreated: data.publishedAt,
      datePublished: data.publishedAt,
      parentItem: {
        '@id': `${host}${data.articleSlug}#${COMMENT_ID_PREFIX}${data.parentId}`,
      },
      text: data.body,
    });
  });
});

describe('getSchemaFrom', () => {
  it('combines the given graphs with a Person graph', () => {
    const graphs: Graph['@graph'] = [
      { '@type': '3DModel' },
      { '@type': 'AMRadioChannel' },
    ];
    const result = getSchemaFrom(graphs);

    expect(result).toStrictEqual({
      '@context': 'https://schema.org',
      '@graph': [getAuthorGraph(), ...graphs],
    });
  });
});
