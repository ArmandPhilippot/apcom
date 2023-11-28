import { afterEach, describe, expect, it } from '@jest/globals';
import { wpThematicsFixture } from '../../../../../tests/fixtures';
import { fetchThematicsList } from './fetch-thematics-list';

describe('fetch-thematics-list', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns the WordPress thematics using GraphQL', async () => {
    const result = await fetchThematicsList({});

    expect.assertions(1);

    expect(result.pageInfo.total).toBe(wpThematicsFixture.length);
  });

  it('rejects with an error when no thematics are found', async () => {
    window.history.replaceState({}, '', '/?error=true');
    expect.assertions(1);

    await expect(async () =>
      fetchThematicsList({ where: { title: 'inexistent-title' } })
    ).rejects.toEqual(new Error('No thematics found.'));
  });
});
