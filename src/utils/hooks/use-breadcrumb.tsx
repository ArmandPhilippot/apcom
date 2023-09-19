import { useIntl } from 'react-intl';
import { BreadcrumbList } from 'schema-dts';
import { BreadcrumbItem } from '../../components/molecules/nav/breadcrumb';
import { slugify } from '../helpers/strings';
import useSettings from './use-settings';

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
const useBreadcrumb = ({
  title,
  url,
}: useBreadcrumbProps): useBreadcrumbReturn => {
  const intl = useIntl();
  const { website } = useSettings();
  const isArticle = url.startsWith('/article/');
  const isHome = url === '/';
  const isPageNumber = url.includes('/page/');
  const isProject = url.startsWith('/projets/');
  const isSearch = url.startsWith('/recherche');
  const isThematic = url.startsWith('/thematique/');
  const isTopic = url.startsWith('/sujet/');

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
    items.push({ id: 'blog', name: blogLabel, url: '/blog' });
    schema.push({
      '@type': 'ListItem',
      position: 2,
      name: blogLabel,
      item: `${website.url}/blog`,
    });
  }

  if (isProject) {
    const projectsLabel = intl.formatMessage({
      defaultMessage: 'Projects',
      description: 'Breadcrumb: projects label',
      id: '28GZdv',
    });
    items.push({ id: 'blog', name: projectsLabel, url: '/projets' });
    schema.push({
      '@type': 'ListItem',
      position: 2,
      name: projectsLabel,
      item: `${website.url}/projets`,
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

export default useBreadcrumb;
