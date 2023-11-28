import { describe, expect, it } from '@jest/globals';
import { wpThematicsFixture } from '../../../../../tests/fixtures';
import { fetchThematic } from './fetch-thematic';

describe('fetch-thematic', () => {
  it('returns a thematic by slug', async () => {
    const result = await fetchThematic(wpThematicsFixture[2].slug);

    expect.assertions(1);

    expect(result).toStrictEqual(wpThematicsFixture[2]);
  });

  it('rejects with an error when the slug does not exist', async () => {
    const slug = '/inexistent-slug';

    expect.assertions(1);

    await expect(async () => fetchThematic(slug)).rejects.toEqual(
      new Error(`No thematic found for the following slug ${slug}.`)
    );
  });
});
