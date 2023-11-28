import { afterEach, describe, expect, it } from '@jest/globals';
import { wpThematicsFixture } from '../../../../../tests/fixtures';
import { fetchAllThematicsSlugs } from './fetch-all-thematics-slugs';

describe('fetch-all-thematics-slugs', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns the WordPress thematics using GraphQL', async () => {
    const result = await fetchAllThematicsSlugs(wpThematicsFixture.length);

    expect.assertions(1);

    expect(result).toStrictEqual(wpThematicsFixture.map((post) => post.slug));
  });

  it('rejects with an error when no thematics are found', async () => {
    window.history.replaceState({}, '', '/?error=true');
    expect.assertions(1);

    await expect(async () =>
      fetchAllThematicsSlugs(wpThematicsFixture.length)
    ).rejects.toEqual(new Error('Unable to find the thematics slugs.'));
  });
});
