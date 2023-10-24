/* eslint-disable max-statements */
import { useIntl } from 'react-intl';
import type { BreadcrumbList } from 'schema-dts';
import type { BreadcrumbsItem } from '../../components';
import { ROUTES } from '../constants';
import { slugify } from '../helpers';
import { useSettings } from './use-settings';

const isArticle = (url: string) => url.startsWith(`${ROUTES.ARTICLE}/`);

const isHome = (url: string) => url === '/';

const isPageNumber = (url: string) => url.includes('/page/');

const isProject = (url: string) => url.startsWith(`${ROUTES.PROJECTS}/`);

const isSearch = (url: string) => url.startsWith(ROUTES.SEARCH);

const isThematic = (url: string) =>
  url.startsWith(`${ROUTES.THEMATICS.INDEX}/`);

const isTopic = (url: string) => url.startsWith(`${ROUTES.TOPICS}/`);

const hasBlogAsParent = (url: string) =>
  isArticle(url) ||
  isPageNumber(url) ||
  isSearch(url) ||
  isThematic(url) ||
  isTopic(url);

export type useBreadcrumbProps = {
  /**
   * The current page title.
   */
  title: string;
  /**
   * The current page url.
   */
  url: string;
};

export type useBreadcrumbReturn = {
  /**
   * The breadcrumb items.
   */
  items: BreadcrumbsItem[];
  /**
   * The breadcrumb JSON schema.
   */
  schema: BreadcrumbList['itemListElement'][];
};

/**
 * Retrieve the breadcrumb items.
 *
 * @param {useBreadcrumbProps} props - An object (the current page title & url).
 * @returns {useBreadcrumbReturn} The breadcrumb items and its JSON schema.
 */
export const useBreadcrumb = ({
  title,
  url,
}: useBreadcrumbProps): useBreadcrumbReturn => {
  const intl = useIntl();
  const { website } = useSettings();
  const labels = {
    home: intl.formatMessage({
      defaultMessage: 'Home',
      description: 'Breadcrumb: home label',
      id: 'j5k9Fe',
    }),
    blog: intl.formatMessage({
      defaultMessage: 'Blog',
      description: 'Breadcrumb: blog label',
      id: 'Es52wh',
    }),
    projects: intl.formatMessage({
      defaultMessage: 'Projects',
      description: 'Breadcrumb: projects label',
      id: '28GZdv',
    }),
  };

  const items: BreadcrumbsItem[] = [
    { id: 'home', name: labels.home, url: '/' },
  ];
  const schema: BreadcrumbList['itemListElement'][] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: labels.home,
      item: website.url,
    },
  ];

  if (isHome(url)) return { items, schema };

  if (hasBlogAsParent(url)) {
    items.push({ id: 'blog', name: labels.blog, url: ROUTES.BLOG });
    schema.push({
      '@type': 'ListItem',
      position: 2,
      name: labels.blog,
      item: `${website.url}${ROUTES.BLOG}`,
    });
  }

  if (isProject(url)) {
    items.push({ id: 'projects', name: labels.projects, url: ROUTES.PROJECTS });
    schema.push({
      '@type': 'ListItem',
      position: 2,
      name: labels.projects,
      item: `${website.url}${ROUTES.PROJECTS}`,
    });
  }

  items.push({ id: slugify(title), name: title, url });
  schema.push({
    '@type': 'ListItem',
    position: schema.length + 1,
    name: title,
    item: `${website.url}${url}`,
  });

  return { items, schema };
};
