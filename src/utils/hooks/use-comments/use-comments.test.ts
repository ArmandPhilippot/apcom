import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { useComments } from './use-comments';

describe('useComments', () => {
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
  it('fetch the requested comments', async () => {
    const { result } = renderHook(() => useComments({}));

    // Inaccurate assertions count because of waitFor...
    //expect.assertions(8);
    expect.hasAssertions();

    expect(result.current.comments).toBeUndefined();
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isValidating).toBe(true);

    jest.advanceTimersToNextTimer();

    await waitFor(() => expect(result.current.comments).toBeDefined());

    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isValidating).toBe(false);
  });
  /* eslint-enable max-statements */
});
