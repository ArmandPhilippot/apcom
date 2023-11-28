import { describe, expect, it } from '@jest/globals';
import { wpTopicsFixture } from '../../../../../tests/fixtures';
import { fetchTopic } from './fetch-topic';

describe('fetch-topic', () => {
  it('returns a topic by slug', async () => {
    const result = await fetchTopic(wpTopicsFixture[2].slug);

    expect.assertions(1);

    expect(result).toStrictEqual(wpTopicsFixture[2]);
  });

  it('rejects with an error when the slug does not exist', async () => {
    const slug = '/inexistent-slug';

    expect.assertions(1);

    await expect(async () => fetchTopic(slug)).rejects.toEqual(
      new Error(`No topic found for the following slug ${slug}.`)
    );
  });
});
