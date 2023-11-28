import { afterEach, describe, expect, it } from '@jest/globals';
import { wpTopicsFixture } from '../../../../../tests/fixtures';
import { fetchTopicsList } from './fetch-topics-list';

describe('fetch-topics-list', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns the WordPress topics using GraphQL', async () => {
    const result = await fetchTopicsList({});

    expect.assertions(1);

    expect(result.pageInfo.total).toBe(wpTopicsFixture.length);
  });

  it('rejects with an error when no topics are found', async () => {
    window.history.replaceState({}, '', '/?error=true');
    expect.assertions(1);

    await expect(async () =>
      fetchTopicsList({ where: { title: 'inexistent-title' } })
    ).rejects.toEqual(new Error('No topics found.'));
  });
});
