import { describe, expect, it } from '@jest/globals';
import { wpPostsFixture } from '../../../../../tests/fixtures';
import { fetchPost } from './fetch-post';

describe('fetch-post', () => {
  it('returns a post by slug', async () => {
    const result = await fetchPost(wpPostsFixture[2].slug);

    expect.assertions(1);

    expect(result).toStrictEqual(wpPostsFixture[2]);
  });

  it('rejects with an error when the slug does not exist', async () => {
    const slug = '/inexistent-slug';

    expect.assertions(1);

    await expect(async () => fetchPost(slug)).rejects.toEqual(
      new Error(`No post found for the following slug ${slug}.`)
    );
  });
});
