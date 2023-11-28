import { afterEach, describe, expect, it } from '@jest/globals';
import { wpThematicsFixture } from '../../../../../tests/fixtures';
import { fetchThematicsCount } from './fetch-thematics-count';

describe('fetch-thematics-count', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns the WordPress thematics count using GraphQL', async () => {
    const result = await fetchThematicsCount();

    expect.assertions(1);

    expect(result).toBe(wpThematicsFixture.length);
  });

  it('rejects with an error when no thematics are found', async () => {
    window.history.replaceState({}, '', '/?error=true');
    expect.assertions(1);

    await expect(async () => fetchThematicsCount()).rejects.toEqual(
      new Error('Unable to find the total number of thematics.')
    );
  });
});
