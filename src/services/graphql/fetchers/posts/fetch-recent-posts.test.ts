import { afterEach, describe, expect, it } from '@jest/globals';
import { fetchRecentPosts } from './fetch-recent-posts';

describe('fetch-recent-posts', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns the WordPress most recent posts using GraphQL', async () => {
    const result = await fetchRecentPosts({ first: 2 });

    expect.assertions(1);

    expect(result.edges.length).toBe(2);
  });

  it('rejects with an error when no posts are found', async () => {
    window.history.replaceState({}, '', '/?error=true');
    expect.assertions(1);

    await expect(async () =>
      fetchRecentPosts({ where: { authorName: 'inexistent-author' } })
    ).rejects.toEqual(new Error('No recent posts found.'));
  });
});
