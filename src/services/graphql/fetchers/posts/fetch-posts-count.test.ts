import { afterEach, describe, expect, it } from '@jest/globals';
import { wpPostsFixture } from '../../../../../tests/fixtures';
import { fetchPostsCount } from './fetch-posts-count';

describe('fetch-posts-count', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns the WordPress posts count using GraphQL', async () => {
    const result = await fetchPostsCount();

    expect.assertions(1);

    expect(result).toBe(wpPostsFixture.length);
  });

  it('rejects with an error when no posts are found', async () => {
    window.history.replaceState({}, '', '/?error=true');
    expect.assertions(1);

    await expect(async () => fetchPostsCount()).rejects.toEqual(
      new Error('Unable to find the total number of posts.')
    );
  });
});
