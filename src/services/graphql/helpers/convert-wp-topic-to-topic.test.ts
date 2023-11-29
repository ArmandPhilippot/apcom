import { describe, expect, it } from '@jest/globals';
import type { WPTopic } from '../../../types';
import { ROUTES } from '../../../utils/constants';
import {
  getUniquePageLinks,
  sortPageLinksByName,
} from '../../../utils/helpers';
import { convertPostPreviewToArticlePreview } from './convert-post-preview-to-article-preview';
import { convertWPThematicPreviewToPageLink } from './convert-taxonomy-to-page-link';
import { convertWPTopicToTopic } from './convert-wp-topic-to-topic';

describe('convert-wp-topic-to-topic', () => {
  /* eslint-disable max-statements */
  it('converts a WPTopic object to a Topic object', () => {
    const topic = {
      acfTopics: null,
      contentParts: {
        afterMore:
          'Sit quam officia officia ea hic. Velit architecto dignissimos sint est rerum praesentium ad ut. Dicta eligendi tenetur iure quis consequatur alias sit est voluptatibus. Vel ullam hic. Assumenda nisi voluptatum est. Molestiae odit consequatur qui enim itaque.',
        beforeMore:
          'Aut aut ut. Et laboriosam et id expedita. Laudantium corporis placeat.',
      },
      databaseId: 1,
      date: '2023-11-27',
      featuredImage: null,
      modified: '2023-11-27',
      seo: {
        metaDesc: 'Earum qui tenetur a.',
        title: 'est eligendi placeat',
      },
      slug: '/debitis-nulla-sapiente',
      title: 'debitis nulla sapiente',
    } satisfies WPTopic;
    const result = convertWPTopicToTopic(topic);

    expect(result.content).toBe(topic.contentParts.afterMore);
    expect(result.intro).toBe(topic.contentParts.beforeMore);
    expect(result.meta.articles).toBeUndefined();
    expect(result.meta.cover).toBeUndefined();
    expect(result.meta.dates.publication).toBe(topic.date);
    expect(result.meta.dates.update).toBe(topic.modified);
    expect(result.meta.seo.description).toBe(topic.seo.metaDesc);
    expect(result.meta.seo.title).toBe(topic.seo.title);
    expect(result.meta.relatedThematics).toBeUndefined();
    expect(result.meta.website).toBeUndefined();
    expect(result.slug).toBe(`${ROUTES.TOPICS}/${topic.slug}`);
    expect(result.title).toBe(topic.title);
  });
  /* eslint-enable max-statements */

  it('can convert the cover', () => {
    const topic = {
      acfTopics: null,
      contentParts: {
        afterMore:
          'Sit quam officia officia ea hic. Velit architecto dignissimos sint est rerum praesentium ad ut. Dicta eligendi tenetur iure quis consequatur alias sit est voluptatibus. Vel ullam hic. Assumenda nisi voluptatum est. Molestiae odit consequatur qui enim itaque.',
        beforeMore:
          'Aut aut ut. Et laboriosam et id expedita. Laudantium corporis placeat.',
      },
      databaseId: 1,
      date: '2023-11-27',
      featuredImage: {
        node: {
          altText: 'rem omnis nulla',
          mediaDetails: {
            height: 480,
            width: 640,
          },
          sourceUrl: 'https://picsum.photos/640/480',
          title: 'earum eos non',
        },
      },
      modified: '2023-11-27',
      seo: {
        metaDesc: 'Earum qui tenetur a.',
        title: 'est eligendi placeat',
      },
      slug: '/debitis-nulla-sapiente',
      title: 'debitis nulla sapiente',
    } satisfies WPTopic;
    const result = convertWPTopicToTopic(topic);

    expect(result.meta.cover?.alt).toBe(topic.featuredImage.node.altText);
    expect(result.meta.cover?.height).toBe(
      topic.featuredImage.node.mediaDetails.height
    );
    expect(result.meta.cover?.src).toBe(topic.featuredImage.node.sourceUrl);
    expect(result.meta.cover?.title).toBe(topic.featuredImage.node.title);
    expect(result.meta.cover?.width).toBe(
      topic.featuredImage.node.mediaDetails.width
    );
  });

  it('can retrieve the website', () => {
    const topic = {
      acfTopics: {
        officialWebsite: 'https://example.test',
        postsInTopic: null,
      },
      contentParts: {
        afterMore:
          'Sit quam officia officia ea hic. Velit architecto dignissimos sint est rerum praesentium ad ut. Dicta eligendi tenetur iure quis consequatur alias sit est voluptatibus. Vel ullam hic. Assumenda nisi voluptatum est. Molestiae odit consequatur qui enim itaque.',
        beforeMore:
          'Aut aut ut. Et laboriosam et id expedita. Laudantium corporis placeat.',
      },
      databaseId: 1,
      date: '2023-11-27',
      featuredImage: null,
      modified: '2023-11-27',
      seo: {
        metaDesc: 'Earum qui tenetur a.',
        title: 'est eligendi placeat',
      },
      slug: '/debitis-nulla-sapiente',
      title: 'debitis nulla sapiente',
    } satisfies WPTopic;
    const result = convertWPTopicToTopic(topic);

    expect(result.meta.website).toBe(topic.acfTopics.officialWebsite);
  });

  it('can convert the articles', () => {
    const topic = {
      acfTopics: {
        officialWebsite: null,
        postsInTopic: [
          {
            acfPosts: null,
            commentCount: 4,
            contentParts: {
              beforeMore:
                'Dolor cupiditate nisi sed qui numquam provident cumque et. Harum nihil soluta id pariatur possimus temporibus est eligendi ex. Culpa hic consequuntur expedita culpa alias voluptatem.',
            },
            databaseId: 2,
            date: '2023-07-22',
            featuredImage: null,
            info: {
              wordsCount: 412,
            },
            modified: '2023-07-23',
            slug: '/qui-temporibus-velit',
            title: 'qui temporibus velit',
          },
          {
            acfPosts: null,
            commentCount: 2,
            contentParts: {
              beforeMore:
                'Quia quis dolorem. Nobis iusto nihil omnis omnis. Et qui cum porro omnis. Omnis tempore quis adipisci sapiente nisi quod tempore porro. Facere quia ad amet accusantium ipsam autem consequatur alias.',
            },
            databaseId: 6,
            date: '2023-08-12',
            featuredImage: null,
            info: {
              wordsCount: 365,
            },
            modified: '2023-08-12',
            slug: '/dicta-esse-et',
            title: 'dicta esse et',
          },
        ],
      },
      contentParts: {
        afterMore:
          'Sit quam officia officia ea hic. Velit architecto dignissimos sint est rerum praesentium ad ut. Dicta eligendi tenetur iure quis consequatur alias sit est voluptatibus. Vel ullam hic. Assumenda nisi voluptatum est. Molestiae odit consequatur qui enim itaque.',
        beforeMore:
          'Aut aut ut. Et laboriosam et id expedita. Laudantium corporis placeat.',
      },
      databaseId: 1,
      date: '2023-11-27',
      featuredImage: null,
      modified: '2023-11-27',
      seo: {
        metaDesc: 'Earum qui tenetur a.',
        title: 'est eligendi placeat',
      },
      slug: '/debitis-nulla-sapiente',
      title: 'debitis nulla sapiente',
    } satisfies WPTopic;
    const result = convertWPTopicToTopic(topic);

    expect(result.meta.articles).toStrictEqual(
      topic.acfTopics.postsInTopic.map(convertPostPreviewToArticlePreview)
    );
  });

  it('can retrieve the related thematics from the articles', () => {
    const topic = {
      acfTopics: {
        officialWebsite: null,
        postsInTopic: [
          {
            acfPosts: {
              postsInThematic: [
                {
                  databaseId: 5,
                  slug: '/consequatur-est-modi',
                  title: 'consequatur est modi',
                },
                {
                  databaseId: 15,
                  slug: '/repudiandae-est-quia',
                  title: 'repudiandae est quia',
                },
              ],
            },
            commentCount: 4,
            contentParts: {
              beforeMore:
                'Dolor cupiditate nisi sed qui numquam provident cumque et. Harum nihil soluta id pariatur possimus temporibus est eligendi ex. Culpa hic consequuntur expedita culpa alias voluptatem.',
            },
            databaseId: 2,
            date: '2023-07-22',
            featuredImage: null,
            info: {
              wordsCount: 412,
            },
            modified: '2023-07-23',
            slug: '/qui-temporibus-velit',
            title: 'qui temporibus velit',
          },
          {
            acfPosts: {
              postsInThematic: [
                {
                  databaseId: 7,
                  slug: '/similique-ea-natus',
                  title: 'similique ea natus',
                },
                {
                  databaseId: 15,
                  slug: '/repudiandae-est-quia',
                  title: 'repudiandae est quia',
                },
              ],
            },
            commentCount: 2,
            contentParts: {
              beforeMore:
                'Quia quis dolorem. Nobis iusto nihil omnis omnis. Et qui cum porro omnis. Omnis tempore quis adipisci sapiente nisi quod tempore porro. Facere quia ad amet accusantium ipsam autem consequatur alias.',
            },
            databaseId: 6,
            date: '2023-08-12',
            featuredImage: null,
            info: {
              wordsCount: 365,
            },
            modified: '2023-08-12',
            slug: '/dicta-esse-et',
            title: 'dicta esse et',
          },
        ],
      },
      contentParts: {
        afterMore:
          'Sit quam officia officia ea hic. Velit architecto dignissimos sint est rerum praesentium ad ut. Dicta eligendi tenetur iure quis consequatur alias sit est voluptatibus. Vel ullam hic. Assumenda nisi voluptatum est. Molestiae odit consequatur qui enim itaque.',
        beforeMore:
          'Aut aut ut. Et laboriosam et id expedita. Laudantium corporis placeat.',
      },
      databaseId: 1,
      date: '2023-11-27',
      featuredImage: null,
      modified: '2023-11-27',
      seo: {
        metaDesc: 'Earum qui tenetur a.',
        title: 'est eligendi placeat',
      },
      slug: '/debitis-nulla-sapiente',
      title: 'debitis nulla sapiente',
    } satisfies WPTopic;
    const result = convertWPTopicToTopic(topic);
    const thematics = topic.acfTopics.postsInTopic.flatMap((post) =>
      post.acfPosts.postsInThematic.map(convertWPThematicPreviewToPageLink)
    );
    const uniqueThematics =
      getUniquePageLinks(thematics).sort(sortPageLinksByName);

    expect(result.meta.relatedThematics).toStrictEqual(uniqueThematics);
  });
});
