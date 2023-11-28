import { afterEach, describe, expect, it } from '@jest/globals';
import { wpCommentsFixture } from '../../../../../tests/fixtures';
import { fetchCommentsList } from './fetch-comments';

describe('fetch-comments', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns the WordPress comments using GraphQL', async () => {
    const result = await fetchCommentsList({});

    expect.assertions(1);

    expect(result.length).toBe(wpCommentsFixture.length);
  });

  it('rejects with an error when no comments are found', async () => {
    window.history.replaceState({}, '', '/?error=true');
    expect.assertions(1);

    await expect(async () =>
      fetchCommentsList({ where: { contentName: '/inexistent-slug' } })
    ).rejects.toEqual(new Error('No comments found.'));
  });
});
