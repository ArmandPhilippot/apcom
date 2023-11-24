import { describe, expect, it } from '@jest/globals';
import type { RecentWPPost } from '../../../types';
import { convertRecentPostToRecentArticle } from './convert-recent-post-to-recent-article';
import { convertWPImgToImg } from './convert-wp-image-to-img';

describe('convert-recent-post-to-recent-article', () => {
  it('converts a RecentWPPost object to a RecentArticle object', () => {
    const post: RecentWPPost = {
      databaseId: 5,
      date: '2022-03-20',
      featuredImage: null,
      slug: '/the-post-slug',
      title: 'veritatis ex autem',
    };
    const result = convertRecentPostToRecentArticle(post);

    expect(result.cover).toBeUndefined();
    expect(result.id).toBe(post.databaseId);
    expect(result.publicationDate).toBe(post.date);
    expect(result.slug).toBe(post.slug);
    expect(result.title).toBe(post.title);
  });

  it('can convert the cover', () => {
    const post = {
      databaseId: 5,
      date: '2022-03-20',
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
      slug: '/the-post-slug',
      title: 'veritatis ex autem',
    } satisfies RecentWPPost;
    const result = convertRecentPostToRecentArticle(post);

    expect(result.cover).toStrictEqual(
      convertWPImgToImg(post.featuredImage.node)
    );
  });
});
