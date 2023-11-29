import { describe, expect, it } from '@jest/globals';
import type { WPPostPreview, WPThematicPreview } from '../../../types';
import { convertPostPreviewToArticlePreview } from './convert-post-preview-to-article-preview';
import { convertWPThematicPreviewToPageLink } from './convert-taxonomy-to-page-link';
import { convertWPImgToImg } from './convert-wp-image-to-img';

describe('convert-post-preview-to-article-preview', () => {
  /* eslint-disable max-statements */
  it('converts a RecentWPPost object to a RecentArticle object', () => {
    const post: WPPostPreview = {
      acfPosts: null,
      commentCount: 6,
      contentParts: {
        beforeMore:
          'Et quos fuga molestias. Voluptatum nobis mollitia eaque dolorem sunt. Dolores dignissimos consequuntur mollitia. Enim molestias quibusdam sequi. Dolore ut quo. Libero iure non vel reprehenderit.',
      },
      databaseId: 5,
      date: '2021-04-28',
      featuredImage: null,
      info: {
        wordsCount: 450,
      },
      modified: '2021-04-29',
      slug: '/the-post-slug',
      title: 'et tempore sint',
    };
    const result = convertPostPreviewToArticlePreview(post);

    expect(result.id).toBe(post.databaseId);
    expect(result.intro).toBe(post.contentParts.beforeMore);
    expect(result.meta.commentsCount).toBe(post.commentCount);
    expect(result.meta.cover).toBeUndefined();
    expect(result.meta.dates.publication).toBe(post.date);
    expect(result.meta.dates.update).toBe(post.modified);
    expect(result.meta.thematics).toBeUndefined();
    expect(result.meta.wordsCount).toBe(post.info.wordsCount);
    expect(result.slug).toBe(post.slug);
    expect(result.title).toBe(post.title);
  });
  /* eslint-enable max-statements */

  it('can return 0 as comment count if not defined', () => {
    const post: WPPostPreview = {
      acfPosts: null,
      commentCount: null,
      contentParts: {
        beforeMore:
          'Et quos fuga molestias. Voluptatum nobis mollitia eaque dolorem sunt. Dolores dignissimos consequuntur mollitia. Enim molestias quibusdam sequi. Dolore ut quo. Libero iure non vel reprehenderit.',
      },
      databaseId: 5,
      date: '2021-04-28',
      featuredImage: null,
      info: {
        wordsCount: 450,
      },
      modified: '2021-04-29',
      slug: '/the-post-slug',
      title: 'et tempore sint',
    };
    const result = convertPostPreviewToArticlePreview(post);

    expect(result.meta.commentsCount).toBe(0);
  });

  it('can convert the cover', () => {
    const post = {
      acfPosts: null,
      commentCount: null,
      contentParts: {
        beforeMore:
          'Et quos fuga molestias. Voluptatum nobis mollitia eaque dolorem sunt. Dolores dignissimos consequuntur mollitia. Enim molestias quibusdam sequi. Dolore ut quo. Libero iure non vel reprehenderit.',
      },
      databaseId: 5,
      date: '2021-04-28',
      featuredImage: {
        node: {
          altText: 'molestiae praesentium animi',
          mediaDetails: {
            height: 480,
            width: 640,
          },
          sourceUrl: 'https://picsum.photos/640/480',
          title: 'ullam deserunt perspiciatis',
        },
      },
      info: {
        wordsCount: 450,
      },
      modified: '2021-04-29',
      slug: '/the-post-slug',
      title: 'et tempore sint',
    } satisfies WPPostPreview;
    const result = convertPostPreviewToArticlePreview(post);

    expect(result.meta.cover).toStrictEqual(
      convertWPImgToImg(post.featuredImage.node)
    );
  });

  it('can convert the thematics', () => {
    const thematics: WPThematicPreview[] = [
      { databaseId: 2, slug: '/thematic1', title: 'aut quis vel' },
      { databaseId: 8, slug: '/thematic2', title: 'vel sint autem' },
    ];
    const post: WPPostPreview = {
      acfPosts: {
        postsInThematic: thematics,
      },
      commentCount: 6,
      contentParts: {
        beforeMore:
          'Et quos fuga molestias. Voluptatum nobis mollitia eaque dolorem sunt. Dolores dignissimos consequuntur mollitia. Enim molestias quibusdam sequi. Dolore ut quo. Libero iure non vel reprehenderit.',
      },
      databaseId: 5,
      date: '2021-04-28',
      featuredImage: null,
      info: {
        wordsCount: 450,
      },
      modified: '2021-04-29',
      slug: '/the-post-slug',
      title: 'et tempore sint',
    };
    const result = convertPostPreviewToArticlePreview(post);

    expect(result.meta.thematics).toStrictEqual(
      thematics.map(convertWPThematicPreviewToPageLink)
    );
  });
});
