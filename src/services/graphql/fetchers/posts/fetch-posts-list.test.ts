import { afterEach, describe, expect, it } from '@jest/globals';
import { wpPostsFixture } from '../../../../../tests/fixtures';
import { fetchPostsList } from './fetch-posts-list';

describe('fetch-posts-list', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns the WordPress posts using GraphQL', async () => {
    const result = await fetchPostsList({});

    expect.assertions(1);

    expect(result.pageInfo.total).toBe(wpPostsFixture.length);
  });

  it('rejects with an error when no posts are found', async () => {
    window.history.replaceState({}, '', '/?error=true');
    expect.assertions(1);

    await expect(async () =>
      fetchPostsList({ where: { authorName: 'inexistent-author' } })
    ).rejects.toEqual(new Error('No posts found.'));
  });
});
