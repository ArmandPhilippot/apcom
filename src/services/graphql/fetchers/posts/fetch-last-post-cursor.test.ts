import { afterEach, describe, expect, it } from '@jest/globals';
import { fetchLastPostCursor } from './fetch-last-post-cursor';

describe('fetch-last-post-cursor', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns the cursor of the last WordPress post using GraphQL', async () => {
    const result = await fetchLastPostCursor(2);

    expect.assertions(1);

    expect(result).toBe('cursor2');
  });

  it('rejects with an error when no posts are found', async () => {
    window.history.replaceState({}, '', '/?error=true');
    expect.assertions(1);

    await expect(async () => fetchLastPostCursor(1)).rejects.toEqual(
      new Error('Unable to find the cursor of the last post.')
    );
  });
});
