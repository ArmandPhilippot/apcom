import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { githubRepos } from '../../../../tests/fixtures';
import { useGithubRepoMeta } from './use-github-repo-meta';

describe('useGithubRepoMeta', () => {
  beforeEach(() => {
    /* Not sure why it is needed, but without it Jest was complaining with
     * `Jest worker encountered 4 child process exceptions`... Maybe because of
     * useSWR? */
    jest.useFakeTimers({
      doNotFake: ['queueMicrotask'],
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  /* eslint-disable max-statements */
  it('fetches the requested repository', async () => {
    const { result } = renderHook(() =>
      useGithubRepoMeta({
        name: githubRepos[0].name,
        owner: githubRepos[0].owner,
      })
    );

    // Inaccurate assertions count because of waitFor...
    //expect.assertions(11);
    expect.hasAssertions();

    expect(result.current.meta).toBeUndefined();
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isValidating).toBe(true);

    jest.advanceTimersToNextTimer();

    await waitFor(() => expect(result.current.meta).toBeDefined());
    expect(result.current.meta?.createdAt).toBe(githubRepos[0].createdAt);
    expect(result.current.meta?.stargazerCount).toBe(
      githubRepos[0].stargazerCount
    );
    expect(result.current.meta?.updatedAt).toBe(githubRepos[0].updatedAt);
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isValidating).toBe(false);
  });
  /* eslint-enable max-statements */
});
