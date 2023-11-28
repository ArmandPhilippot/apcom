import { afterEach, describe, expect, it } from '@jest/globals';
import { wpTopicsFixture } from '../../../../../tests/fixtures';
import { fetchAllTopicsSlugs } from './fetch-all-topics-slugs';

describe('fetch-all-topics-slugs', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns the WordPress topics using GraphQL', async () => {
    const result = await fetchAllTopicsSlugs(wpTopicsFixture.length);

    expect.assertions(1);

    expect(result).toStrictEqual(wpTopicsFixture.map((post) => post.slug));
  });

  it('rejects with an error when no topics are found', async () => {
    window.history.replaceState({}, '', '/?error=true');
    expect.assertions(1);

    await expect(async () =>
      fetchAllTopicsSlugs(wpTopicsFixture.length)
    ).rejects.toEqual(new Error('Unable to find the topics slugs.'));
  });
});
