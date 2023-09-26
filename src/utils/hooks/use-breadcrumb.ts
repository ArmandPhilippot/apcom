/* eslint-disable max-statements */
import { useIntl } from 'react-intl';
import type { BreadcrumbList } from 'schema-dts';
import type { BreadcrumbItem } from '../../components';
import { ROUTES } from '../constants';
import { slugify } from '../helpers';
import { useSettings } from './use-settings';

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
  items: BreadcrumbItem[];
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
  const isArticle = url.startsWith(`${ROUTES.ARTICLE}/`);
  const isHome = url === '/';
  const isPageNumber = url.includes('/page/');
  const isProject = url.startsWith(`${ROUTES.PROJECTS}/`);
  const isSearch = url.startsWith(ROUTES.SEARCH);
  const isThematic = url.startsWith(`${ROUTES.THEMATICS.INDEX}/`);
  const isTopic = url.startsWith(`${ROUTES.TOPICS}/`);

  const homeLabel = intl.formatMessage({
    defaultMessage: 'Home',
    description: 'Breadcrumb: home label',
    id: 'j5k9Fe',
  });
  const items: BreadcrumbItem[] = [{ id: 'home', name: homeLabel, url: '/' }];
  const schema: BreadcrumbList['itemListElement'][] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: homeLabel,
      item: website.url,
    },
  ];

  if (isHome) return { items, schema };

  if (isArticle || isPageNumber || isSearch || isThematic || isTopic) {
    const blogLabel = intl.formatMessage({
      defaultMessage: 'Blog',
      description: 'Breadcrumb: blog label',
      id: 'Es52wh',
    });
    items.push({ id: 'blog', name: blogLabel, url: ROUTES.BLOG });
    schema.push({
      '@type': 'ListItem',
      position: 2,
      name: blogLabel,
      item: `${website.url}${ROUTES.BLOG}`,
    });
  }

  if (isProject) {
    const projectsLabel = intl.formatMessage({
      defaultMessage: 'Projects',
      description: 'Breadcrumb: projects label',
      id: '28GZdv',
    });
    items.push({ id: 'projects', name: projectsLabel, url: ROUTES.PROJECTS });
    schema.push({
      '@type': 'ListItem',
      position: 2,
      name: projectsLabel,
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
