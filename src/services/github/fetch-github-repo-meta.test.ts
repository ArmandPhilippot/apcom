import { afterEach, describe, expect, it } from '@jest/globals';
import { githubRepos } from '../../../tests/fixtures';
import { fetchGithubRepoMeta } from './fetch-github-repo-meta';

describe('fetch-github-repo-meta', () => {
  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  it('returns the Github repository meta using GraphQL', async () => {
    const result = await fetchGithubRepoMeta({
      name: githubRepos[0].name,
      owner: githubRepos[0].owner,
    });

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    expect(result.createdAt).toBe(githubRepos[0].createdAt);
    expect(result.stargazerCount).toBe(githubRepos[0].stargazerCount);
    expect(result.updatedAt).toBe(githubRepos[0].updatedAt);
  });

  it('rejects with an error when repository is not found', async () => {
    const name = 'inexistent-repo';
    const owner = 'inexistent-owner';

    window.history.replaceState({}, '', '/?error=true');
    expect.assertions(1);

    await expect(async () =>
      fetchGithubRepoMeta({ name, owner })
    ).rejects.toEqual(
      new Error(`No data found for the following repository ${owner}/${name}.`)
    );
  });

  it('throws an error if the Github token is not defined', async () => {
    process.env.NEXT_PUBLIC_GITHUB_TOKEN = '';

    expect.assertions(1);

    await expect(async () =>
      fetchGithubRepoMeta({ name: 'any-name', owner: 'any-owner' })
    ).rejects.toThrowError(new Error('Github token is not defined.'));
  });
});
