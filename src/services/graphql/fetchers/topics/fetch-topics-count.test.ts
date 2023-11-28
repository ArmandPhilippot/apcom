import { afterEach, describe, expect, it } from '@jest/globals';
import { wpTopicsFixture } from '../../../../../tests/fixtures';
import { fetchTopicsCount } from './fetch-topics-count';

describe('fetch-topics-count', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns the WordPress topics count using GraphQL', async () => {
    const result = await fetchTopicsCount();

    expect.assertions(1);

    expect(result).toBe(wpTopicsFixture.length);
  });

  it('rejects with an error when no topics are found', async () => {
    window.history.replaceState({}, '', '/?error=true');
    expect.assertions(1);

    await expect(async () => fetchTopicsCount()).rejects.toEqual(
      new Error('Unable to find the total number of topics.')
    );
  });
});
