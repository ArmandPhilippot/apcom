import { describe, expect, it } from '@jest/globals';
import type { WPPost } from '../../../types';
import { convertPostToArticle } from './convert-post-to-article';
import { convertWPImgToImg } from './convert-wp-image-to-img';

describe('convert-post-to-article', () => {
  /* eslint-disable max-statements */
  it('converts a WPPost object to an Article object', async () => {
    const post: WPPost = {
      acfPosts: null,
      author: { node: { name: 'Vince5' } },
      commentCount: 10,
      contentParts: {
        afterMore:
          'Eum est rerum neque placeat iure veniam enim consequatur assumenda. Quos eos placeat ea et vel sit ratione fugit. Modi qui sint iure beatae illo voluptas.',
        beforeMore:
          'Omnis ab qui dolorem praesentium voluptas asperiores officiis. Id nostrum minus quae ducimus tenetur eum a rem eum. Aut odio libero sit soluta ullam odit.',
      },
      databaseId: 8,
      date: '2022-05-04',
      featuredImage: null,
      info: { wordsCount: 300 },
      modified: '2022-06-01',
      seo: {
        metaDesc: 'Est non debitis quas harum quasi voluptatem qui.',
        title: 'consequuntur molestiae amet',
      },
      slug: '/the-post-slug',
      title: 'ea vero repellat',
    };
    const result = await convertPostToArticle(post);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(15);

    expect(result.content).toBe(post.contentParts.afterMore);
    expect(result.id).toBe(post.databaseId);
    expect(result.intro).toBe(post.contentParts.beforeMore);
    expect(result.meta.author).toBe(post.author.node.name);
    expect(result.meta.commentsCount).toBe(post.commentCount);
    expect(result.meta.cover).toBeUndefined();
    expect(result.meta.dates.publication).toBe(post.date);
    expect(result.meta.dates.update).toBe(post.modified);
    expect(result.meta.seo.description).toBe(post.seo.metaDesc);
    expect(result.meta.seo.title).toBe(post.seo.title);
    expect(result.meta.thematics).toBeUndefined();
    expect(result.meta.topics).toBeUndefined();
    expect(result.meta.wordsCount).toBe(post.info.wordsCount);
    expect(result.slug).toBe(post.slug);
    expect(result.title).toBe(post.title);
  });
  /* eslint-enable max-statements */

  it('can convert the cover', async () => {
    const post = {
      acfPosts: null,
      author: { node: { name: 'Vince5' } },
      commentCount: null,
      contentParts: {
        afterMore:
          'Eum est rerum neque placeat iure veniam enim consequatur assumenda. Quos eos placeat ea et vel sit ratione fugit. Modi qui sint iure beatae illo voluptas.',
        beforeMore:
          'Omnis ab qui dolorem praesentium voluptas asperiores officiis. Id nostrum minus quae ducimus tenetur eum a rem eum. Aut odio libero sit soluta ullam odit.',
      },
      databaseId: 8,
      date: '2022-05-04',
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
      info: { wordsCount: 300 },
      modified: '2022-06-01',
      seo: {
        metaDesc: 'Est non debitis quas harum quasi voluptatem qui.',
        title: 'consequuntur molestiae amet',
      },
      slug: '/the-post-slug',
      title: 'ea vero repellat',
    } satisfies WPPost;
    const result = await convertPostToArticle(post);

    expect.assertions(1);

    expect(result.meta.cover).toStrictEqual(
      convertWPImgToImg(post.featuredImage.node)
    );
  });

  it('can return 0 as comment count when not defined', async () => {
    const post: WPPost = {
      acfPosts: null,
      author: { node: { name: 'Vince5' } },
      commentCount: null,
      contentParts: {
        afterMore:
          'Eum est rerum neque placeat iure veniam enim consequatur assumenda. Quos eos placeat ea et vel sit ratione fugit. Modi qui sint iure beatae illo voluptas.',
        beforeMore:
          'Omnis ab qui dolorem praesentium voluptas asperiores officiis. Id nostrum minus quae ducimus tenetur eum a rem eum. Aut odio libero sit soluta ullam odit.',
      },
      databaseId: 8,
      date: '2022-05-04',
      featuredImage: null,
      info: { wordsCount: 300 },
      modified: '2022-06-01',
      seo: {
        metaDesc: 'Est non debitis quas harum quasi voluptatem qui.',
        title: 'consequuntur molestiae amet',
      },
      slug: '/the-post-slug',
      title: 'ea vero repellat',
    };
    const result = await convertPostToArticle(post);

    expect.assertions(1);

    expect(result.meta.commentsCount).toBe(0);
  });
});
