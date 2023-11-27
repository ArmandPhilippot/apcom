import { afterEach, describe, expect, it } from '@jest/globals';
import { wpPostsFixture } from '../../../../../tests/fixtures';
import { fetchAllPostsSlugs } from './fetch-all-posts-slugs';

describe('fetch-all-posts-slugs', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns the WordPress posts using GraphQL', async () => {
    const result = await fetchAllPostsSlugs(wpPostsFixture.length);

    expect.assertions(1);

    expect(result).toStrictEqual(wpPostsFixture.map((post) => post.slug));
  });

  it('rejects with an error when no posts are found', async () => {
    window.history.replaceState({}, '', '/?error=true');
    expect.assertions(1);

    await expect(async () =>
      fetchAllPostsSlugs(wpPostsFixture.length)
    ).rejects.toEqual(new Error('Unable to find the posts slugs.'));
  });
});
