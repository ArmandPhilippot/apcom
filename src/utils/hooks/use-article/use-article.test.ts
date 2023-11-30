import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { wpPostsFixture } from '../../../../tests/fixtures';
import { ROUTES } from '../../constants';
import { useArticle } from './use-article';

describe('useArticle', () => {
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
  it('fetch the requested article', async () => {
    const { result } = renderHook(() => useArticle(wpPostsFixture[0].slug));

    // Inaccurate assertions count because of waitFor...
    //expect.assertions(8);
    expect.hasAssertions();

    expect(result.current.article).toBeUndefined();
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isValidating).toBe(true);

    jest.advanceTimersToNextTimer();

    await waitFor(() =>
      expect(result.current.article?.slug).toBe(
        `${ROUTES.ARTICLE}/${wpPostsFixture[0].slug}`
      )
    );
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isValidating).toBe(false);
  });
  /* eslint-enable max-statements */
});
