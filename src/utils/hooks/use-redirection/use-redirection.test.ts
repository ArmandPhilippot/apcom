import { describe, it } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import nextRouterMock from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { useRedirection } from './use-redirection';

describe('useRedirection', () => {
  it('redirects to another page', async () => {
    const initialPath = '/initial-path';
    const redirectPath = '/redirect-path';

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(2);

    await nextRouterMock.push('/initial-path');

    expect(nextRouterMock.asPath).toBe(initialPath);

    renderHook(() => useRedirection({ to: redirectPath }), {
      wrapper: MemoryRouterProvider,
    });

    expect(nextRouterMock.asPath).toBe(redirectPath);
  });

  it('can replace the url in the history', async () => {
    const initialPath = '/initial-path';
    const redirectPath = '/redirect-path';

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(2);

    await nextRouterMock.push('/initial-path');

    expect(nextRouterMock.asPath).toBe(initialPath);

    renderHook(() => useRedirection({ isReplacing: true, to: redirectPath }), {
      wrapper: MemoryRouterProvider,
    });

    expect(nextRouterMock.asPath).toBe(redirectPath);

    /* Ideally we should check if when we use `back()` the current path is
     * still the redirectPath but it is not yet implemented in the mock. */
  });

  it('can conditionally redirect to another page', async () => {
    const paths = {
      initial: '/initial-path',
      matching: '/matching-path',
      redirect: '/redirect-path',
    };

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    await nextRouterMock.push('/initial-path');

    expect(nextRouterMock.asPath).toBe(paths.initial);

    const { rerender } = renderHook(
      () =>
        useRedirection({
          to: paths.redirect,
          whenPathMatches: (path) => path === paths.matching,
        }),
      {
        wrapper: MemoryRouterProvider,
      }
    );

    expect(nextRouterMock.asPath).toBe(paths.initial);

    await nextRouterMock.push(paths.matching);

    rerender();

    expect(nextRouterMock.asPath).toBe(paths.redirect);
  });
});
