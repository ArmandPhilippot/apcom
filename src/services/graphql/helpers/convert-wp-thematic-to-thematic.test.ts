import { describe, expect, it } from '@jest/globals';
import type { WPThematic } from '../../../types';
import { ROUTES } from '../../../utils/constants';
import {
  getUniquePageLinks,
  sortPageLinksByName,
} from '../../../utils/helpers';
import { convertPostPreviewToArticlePreview } from './convert-post-preview-to-article-preview';
import { convertWPTopicPreviewToPageLink } from './convert-taxonomy-to-page-link';
import { convertWPThematicToThematic } from './convert-wp-thematic-to-thematic';

describe('convert-wp-thematic-to-thematic', () => {
  /* eslint-disable max-statements */
  it('converts a WPThematic object to a Thematic object', () => {
    const thematic = {
      acfThematics: null,
      contentParts: {
        afterMore:
          'Repellat eius adipisci et voluptate fugit enim aut aut recusandae. In sit quisquam est rerum molestiae quos quaerat repellat totam. Porro reiciendis sed adipisci dolore impedit et.',
        beforeMore:
          'Id maxime illo laborum laborum. Ab culpa voluptatem non qui provident adipisci corrupti eius. Delectus facere praesentium. Debitis recusandae nemo ut velit.',
      },
      databaseId: 1,
      date: '2023-11-27',
      featuredImage: null,
      modified: '2023-11-27',
      seo: {
        metaDesc: 'Nemo illum veniam aliquam.',
        title: 'qui id cupiditate',
      },
      slug: '/sequi-veritatis-earum',
      title: 'sequi veritatis earum',
    } satisfies WPThematic;
    const result = convertWPThematicToThematic(thematic);

    expect(result.content).toBe(thematic.contentParts.afterMore);
    expect(result.intro).toBe(thematic.contentParts.beforeMore);
    expect(result.meta.articles).toBeUndefined();
    expect(result.meta.cover).toBeUndefined();
    expect(result.meta.dates.publication).toBe(thematic.date);
    expect(result.meta.dates.update).toBe(thematic.modified);
    expect(result.meta.seo.description).toBe(thematic.seo.metaDesc);
    expect(result.meta.seo.title).toBe(thematic.seo.title);
    expect(result.meta.relatedTopics).toBeUndefined();
    expect(result.slug).toBe(`${ROUTES.THEMATICS}/${thematic.slug}`);
    expect(result.title).toBe(thematic.title);
  });
  /* eslint-enable max-statements */

  it('can convert the cover', () => {
    const thematic = {
      acfThematics: null,
      contentParts: {
        afterMore:
          'Repellat eius adipisci et voluptate fugit enim aut aut recusandae. In sit quisquam est rerum molestiae quos quaerat repellat totam. Porro reiciendis sed adipisci dolore impedit et.',
        beforeMore:
          'Id maxime illo laborum laborum. Ab culpa voluptatem non qui provident adipisci corrupti eius. Delectus facere praesentium. Debitis recusandae nemo ut velit.',
      },
      databaseId: 1,
      date: '2023-11-27',
      featuredImage: {
        node: {
          altText: 'expedita commodi placeat',
          mediaDetails: {
            height: 480,
            width: 640,
          },
          sourceUrl: 'https://picsum.photos/640/480',
          title: 'et sint et',
        },
      },
      modified: '2023-11-27',
      seo: {
        metaDesc: 'Nemo illum veniam aliquam.',
        title: 'qui id cupiditate',
      },
      slug: '/sequi-veritatis-earum',
      title: 'sequi veritatis earum',
    } satisfies WPThematic;
    const result = convertWPThematicToThematic(thematic);

    expect(result.meta.cover?.alt).toBe(thematic.featuredImage.node.altText);
    expect(result.meta.cover?.height).toBe(
      thematic.featuredImage.node.mediaDetails.height
    );
    expect(result.meta.cover?.src).toBe(thematic.featuredImage.node.sourceUrl);
    expect(result.meta.cover?.title).toBe(thematic.featuredImage.node.title);
    expect(result.meta.cover?.width).toBe(
      thematic.featuredImage.node.mediaDetails.width
    );
  });

  it('can convert the articles', () => {
    const thematic = {
      acfThematics: {
        postsInThematic: [
          {
            acfPosts: null,
            commentCount: 2,
            contentParts: {
              beforeMore:
                'Iste cupiditate natus esse ut et ut nihil excepturi. Blanditiis optio sit et velit vel nobis iste hic aspernatur. Labore doloremque facere nulla provident aspernatur qui incidunt.',
            },
            databaseId: 8,
            date: '2023-09-20',
            featuredImage: null,
            info: {
              wordsCount: 250,
            },
            modified: '2023-09-21',
            slug: '/quam-voluptatem-quos',
            title: 'quam voluptatem quos',
          },
          {
            acfPosts: null,
            commentCount: 7,
            contentParts: {
              beforeMore:
                'Dolorum sit consectetur inventore exercitationem. Natus quam corporis ut aut rerum nemo architecto quia odit. Voluptate eos commodi voluptas totam dolorum.',
            },
            databaseId: 13,
            date: '2023-10-12',
            featuredImage: null,
            info: {
              wordsCount: 356,
            },
            modified: '2023-10-15',
            slug: '/ipsa-dolorem-repellendus',
            title: 'ipsa dolorem repellendus',
          },
        ],
      },
      contentParts: {
        afterMore:
          'Repellat eius adipisci et voluptate fugit enim aut aut recusandae. In sit quisquam est rerum molestiae quos quaerat repellat totam. Porro reiciendis sed adipisci dolore impedit et.',
        beforeMore:
          'Id maxime illo laborum laborum. Ab culpa voluptatem non qui provident adipisci corrupti eius. Delectus facere praesentium. Debitis recusandae nemo ut velit.',
      },
      databaseId: 1,
      date: '2023-11-27',
      featuredImage: null,
      modified: '2023-11-27',
      seo: {
        metaDesc: 'Nemo illum veniam aliquam.',
        title: 'qui id cupiditate',
      },
      slug: '/sequi-veritatis-earum',
      title: 'sequi veritatis earum',
    } satisfies WPThematic;
    const result = convertWPThematicToThematic(thematic);

    expect(result.meta.articles).toStrictEqual(
      thematic.acfThematics.postsInThematic.map(
        convertPostPreviewToArticlePreview
      )
    );
  });

  it('can retrieve the related topics from the articles', () => {
    const thematic = {
      acfThematics: {
        postsInThematic: [
          {
            acfPosts: {
              postsInTopic: [
                {
                  databaseId: 4,
                  featuredImage: null,
                  slug: '/voluptas-sit-ut',
                  title: 'voluptas sit ut',
                },
                {
                  databaseId: 9,
                  featuredImage: null,
                  slug: '/ex-omnis-voluptas',
                  title: 'ex omnis voluptas',
                },
              ],
            },
            commentCount: 2,
            contentParts: {
              beforeMore:
                'Iste cupiditate natus esse ut et ut nihil excepturi. Blanditiis optio sit et velit vel nobis iste hic aspernatur. Labore doloremque facere nulla provident aspernatur qui incidunt.',
            },
            databaseId: 8,
            date: '2023-09-20',
            featuredImage: null,
            info: {
              wordsCount: 250,
            },
            modified: '2023-09-21',
            slug: '/quam-voluptatem-quos',
            title: 'quam voluptatem quos',
          },
          {
            acfPosts: {
              postsInTopic: [
                {
                  databaseId: 9,
                  featuredImage: null,
                  slug: '/ex-omnis-voluptas',
                  title: 'ex omnis voluptas',
                },
                {
                  databaseId: 11,
                  featuredImage: null,
                  slug: '/dicta-quisquam-asperiores',
                  title: 'dicta quisquam asperiores',
                },
                {
                  databaseId: 22,
                  featuredImage: null,
                  slug: '/consectetur-laudantium-illum',
                  title: 'consectetur laudantium illum',
                },
              ],
            },
            commentCount: 7,
            contentParts: {
              beforeMore:
                'Dolorum sit consectetur inventore exercitationem. Natus quam corporis ut aut rerum nemo architecto quia odit. Voluptate eos commodi voluptas totam dolorum.',
            },
            databaseId: 13,
            date: '2023-10-12',
            featuredImage: null,
            info: {
              wordsCount: 356,
            },
            modified: '2023-10-15',
            slug: '/ipsa-dolorem-repellendus',
            title: 'ipsa dolorem repellendus',
          },
        ],
      },
      contentParts: {
        afterMore:
          'Repellat eius adipisci et voluptate fugit enim aut aut recusandae. In sit quisquam est rerum molestiae quos quaerat repellat totam. Porro reiciendis sed adipisci dolore impedit et.',
        beforeMore:
          'Id maxime illo laborum laborum. Ab culpa voluptatem non qui provident adipisci corrupti eius. Delectus facere praesentium. Debitis recusandae nemo ut velit.',
      },
      databaseId: 1,
      date: '2023-11-27',
      featuredImage: null,
      modified: '2023-11-27',
      seo: {
        metaDesc: 'Nemo illum veniam aliquam.',
        title: 'qui id cupiditate',
      },
      slug: '/sequi-veritatis-earum',
      title: 'sequi veritatis earum',
    } satisfies WPThematic;
    const result = convertWPThematicToThematic(thematic);
    const topics = thematic.acfThematics.postsInThematic.flatMap((post) =>
      post.acfPosts.postsInTopic.map(convertWPTopicPreviewToPageLink)
    );
    const uniqueThematics =
      getUniquePageLinks(topics).sort(sortPageLinksByName);

    expect(result.meta.relatedTopics).toStrictEqual(uniqueThematics);
  });
});
