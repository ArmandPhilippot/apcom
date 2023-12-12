import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import type { BreadcrumbList } from 'schema-dts';
import type { BreadcrumbsItem } from '../../../components';
import { PAGINATED_ROUTE_PREFIX, ROUTES } from '../../constants';
import { capitalize } from '../../helpers';

const is404 = (slug: string) => slug === ROUTES.NOT_FOUND;
const isArticle = (slug: string) => slug === ROUTES.ARTICLE;
const isBlog = (slug: string) => slug === ROUTES.BLOG;
const isHome = (slug: string) => slug === ROUTES.HOME;
const isPaginated = (slug: string) =>
  new RegExp(`${PAGINATED_ROUTE_PREFIX}/[0-9]+$`).test(slug);
const isProjects = (slug: string) => slug === ROUTES.PROJECTS;
const isSearch = (slug: string) => slug.startsWith(ROUTES.SEARCH);
const isThematic = (slug: string) => slug === ROUTES.THEMATICS;
const isTopic = (slug: string) => slug === ROUTES.TOPICS;

const getCrumbsSlug = (
  acc: string[],
  current: string,
  index: number
): string[] => [
  ...acc,
  ...(isSearch(`/${current}`) ? [`/${current.split('?s=')[0]}`] : []),
  `${acc[acc.length - 1]}${index === 0 ? '' : '/'}${current}`,
];

export type UseBreadcrumbsReturn = {
  items: BreadcrumbsItem[];
  schema: BreadcrumbList;
};

export const useBreadcrumbs = (
  currentPageTitle?: string
): UseBreadcrumbsReturn => {
  const { asPath } = useRouter();
  const intl = useIntl();

  const getCrumbLabel = useCallback(
    (slug: string) => {
      switch (true) {
        case is404(slug):
          return intl.formatMessage({
            defaultMessage: '404: Not found',
            description: 'UseBreadcrumbs: page not found label',
            id: 'EH+dam',
          });
        case isBlog(slug):
          return intl.formatMessage({
            defaultMessage: 'Blog',
            description: 'UseBreadcrumbs: blog label',
            id: 'K6aSZi',
          });
        case isHome(slug):
          return intl.formatMessage({
            defaultMessage: 'Home',
            description: 'UseBreadcrumbs: home label',
            id: 'aZIuPO',
          });
        case isPaginated(slug):
          return intl.formatMessage(
            {
              defaultMessage: 'Page {number}',
              description: 'UseBreadcrumbs: paginated route label',
              id: '/5tytV',
            },
            { number: slug.split('/').pop() }
          );
        case isProjects(slug):
          return intl.formatMessage({
            defaultMessage: 'Projects',
            description: 'UseBreadcrumbs: projects label',
            id: 'rkz8C6',
          });
        case isSearch(slug):
          if (slug.includes('?s='))
            return intl.formatMessage(
              {
                defaultMessage: 'Search results for "{query}"',
                description: 'UseBreadcrumbs: search results label',
                id: 'gSevGm',
              },
              { query: slug.split('?s=').pop() }
            );

          return intl.formatMessage({
            defaultMessage: 'Search',
            description: 'UseBreadcrumbs: search label',
            id: 'iHC3Qx',
          });
        default:
          return capitalize(
            (slug.split('/').pop() ?? slug).replaceAll('-', ' ')
          );
      }
    },
    [intl]
  );

  const items = asPath
    .split('/')
    .filter((part) => part)
    .reduce(getCrumbsSlug, [ROUTES.HOME as string])
    .filter((slug) => !slug.endsWith(PAGINATED_ROUTE_PREFIX))
    .map((slug, index, arr) => {
      if (isArticle(slug) || isThematic(slug) || isTopic(slug))
        return {
          id: ROUTES.BLOG,
          label: getCrumbLabel(ROUTES.BLOG),
          slug: ROUTES.BLOG,
        };

      const isLastSlug = index === arr.length - 1;

      return {
        id: slug,
        label:
          isLastSlug && currentPageTitle
            ? currentPageTitle
            : getCrumbLabel(slug),
        slug,
      };
    });

  return {
    items,
    schema: {
      '@type': 'BreadcrumbList',
      '@id': 'breadcrumbs',
      itemListElement: items.map((item, index) => {
        return {
          '@type': 'ListItem',
          item: {
            '@id': item.slug,
            name: item.label,
          },
          position: index + 1,
        };
      }),
    },
  };
};
