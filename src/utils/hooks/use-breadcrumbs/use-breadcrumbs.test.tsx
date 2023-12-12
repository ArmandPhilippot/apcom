import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import nextRouterMock from 'next-router-mock';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import type { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import { PAGINATED_ROUTE_PREFIX, ROUTES } from '../../constants';
import { capitalize } from '../../helpers';
import { useBreadcrumbs } from './use-breadcrumbs';

const AllProviders = ({ children }: { children: ReactNode }) => (
  <IntlProvider defaultLocale="en" locale="en">
    <MemoryRouterProvider>{children}</MemoryRouterProvider>
  </IntlProvider>
);

describe('useBreadcrumbs', () => {
  it('returns the breadcrumbs items and its schema', async () => {
    const currentSlug = '/current-slug';
    const label = capitalize(
      (currentSlug.split('/').pop() ?? currentSlug).replaceAll('-', ' ')
    );

    await act(async () => nextRouterMock.push(currentSlug));

    const { result } = renderHook(() => useBreadcrumbs(), {
      wrapper: AllProviders,
    });

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);

    expect(result.current.items).toHaveLength(2);
    expect(result.current.items[0]).toStrictEqual({
      id: '/',
      label: 'Home',
      slug: '/',
    });
    expect(result.current.items[1]).toStrictEqual({
      id: currentSlug,
      label,
      slug: currentSlug,
    });
    expect(result.current.schema).toStrictEqual({
      '@type': 'BreadcrumbList',
      '@id': 'breadcrumbs',
      itemListElement: [
        {
          '@type': 'ListItem',
          item: {
            '@id': ROUTES.HOME,
            name: 'Home',
          },
          position: 1,
        },
        {
          '@type': 'ListItem',
          item: {
            '@id': currentSlug,
            name: label,
          },
          position: 2,
        },
      ],
    });
  });

  it('can render the items for the 404 page', async () => {
    await act(async () => nextRouterMock.push(ROUTES.NOT_FOUND));

    const { result } = renderHook(() => useBreadcrumbs(), {
      wrapper: AllProviders,
    });

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    expect(result.current.items).toHaveLength(2);
    expect(result.current.items[0]).toStrictEqual({
      id: '/',
      label: 'Home',
      slug: '/',
    });
    expect(result.current.items[1]).toStrictEqual({
      id: ROUTES.NOT_FOUND,
      label: '404: Not found',
      slug: ROUTES.NOT_FOUND,
    });
  });

  it('can render the items for the Blog page', async () => {
    await act(async () => nextRouterMock.push(ROUTES.BLOG));

    const { result } = renderHook(() => useBreadcrumbs(), {
      wrapper: AllProviders,
    });

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    expect(result.current.items).toHaveLength(2);
    expect(result.current.items[0]).toStrictEqual({
      id: '/',
      label: 'Home',
      slug: '/',
    });
    expect(result.current.items[1]).toStrictEqual({
      id: ROUTES.BLOG,
      label: 'Blog',
      slug: ROUTES.BLOG,
    });
  });

  it('can render the items for the paginated routes', async () => {
    const pageNumber = 3;
    const currentSlug = `${ROUTES.BLOG}${PAGINATED_ROUTE_PREFIX}/${pageNumber}`;
    await act(async () => nextRouterMock.push(currentSlug));

    const { result } = renderHook(() => useBreadcrumbs(), {
      wrapper: AllProviders,
    });

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(result.current.items).toHaveLength(3);
    expect(result.current.items[0]).toStrictEqual({
      id: '/',
      label: 'Home',
      slug: '/',
    });
    expect(result.current.items[1]).toStrictEqual({
      id: ROUTES.BLOG,
      label: 'Blog',
      slug: ROUTES.BLOG,
    });
    expect(result.current.items[2]).toStrictEqual({
      id: currentSlug,
      label: `Page ${pageNumber}`,
      slug: currentSlug,
    });
  });

  it('can render the items for the Projects page', async () => {
    await act(async () => nextRouterMock.push(ROUTES.PROJECTS));

    const { result } = renderHook(() => useBreadcrumbs(), {
      wrapper: AllProviders,
    });

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    expect(result.current.items).toHaveLength(2);
    expect(result.current.items[0]).toStrictEqual({
      id: '/',
      label: 'Home',
      slug: '/',
    });
    expect(result.current.items[1]).toStrictEqual({
      id: ROUTES.PROJECTS,
      label: 'Projects',
      slug: ROUTES.PROJECTS,
    });
  });

  it('can render the items for the Search page', async () => {
    const query = 'similique';
    const currentSlug = `${ROUTES.SEARCH}?s=${query}`;
    await act(async () => nextRouterMock.push(currentSlug));

    const { result } = renderHook(() => useBreadcrumbs(), {
      wrapper: AllProviders,
    });

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(result.current.items).toHaveLength(3);
    expect(result.current.items[0]).toStrictEqual({
      id: '/',
      label: 'Home',
      slug: '/',
    });
    expect(result.current.items[1]).toStrictEqual({
      id: ROUTES.SEARCH,
      label: 'Search',
      slug: ROUTES.SEARCH,
    });
    expect(result.current.items[2]).toStrictEqual({
      id: currentSlug,
      label: `Search results for "${query}"`,
      slug: currentSlug,
    });
  });

  it('can render the items for the Articles page', async () => {
    const article = {
      slug: '/the-article-slug',
      title: 'qui ducimus rerum',
    };
    const currentSlug = `${ROUTES.ARTICLE}${article.slug}`;
    await act(async () => nextRouterMock.push(currentSlug));

    const { result } = renderHook(() => useBreadcrumbs(article.title), {
      wrapper: AllProviders,
    });

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(result.current.items).toHaveLength(3);
    expect(result.current.items[0]).toStrictEqual({
      id: '/',
      label: 'Home',
      slug: '/',
    });
    expect(result.current.items[1]).toStrictEqual({
      id: ROUTES.BLOG,
      label: 'Blog',
      slug: ROUTES.BLOG,
    });
    expect(result.current.items[2]).toStrictEqual({
      id: currentSlug,
      label: article.title,
      slug: currentSlug,
    });
  });
});
