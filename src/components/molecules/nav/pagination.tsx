import ButtonLink from '@components/atoms/buttons/button-link';
import { FC, Fragment, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import styles from './pagination.module.scss';

export type PaginationProps = {
  /**
   * An accessible name for the pagination.
   */
  'aria-label'?: string;
  /**
   * The url part before page number. Default: /page/
   */
  baseUrl?: string;
  /**
   * Set additional classnames to the pagination wrapper.
   */
  className?: string;
  /**
   * The current page number.
   */
  current: number;
  /**
   * The number of items per page.
   */
  perPage: number;
  /**
   * The number of siblings on one side of the current page. Default: 1.
   */
  siblings?: number;
  /**
   * The total number of items.
   */
  total: number;
};

/**
 * Pagination component
 *
 * Render a page-based navigation.
 */
const Pagination: FC<PaginationProps> = ({
  baseUrl = '/page/',
  className = '',
  current,
  perPage,
  siblings = 2,
  total,
  ...props
}) => {
  const intl = useIntl();
  const totalPages = Math.round(total / perPage);
  const hasPreviousPage = current > 1;
  const previousPageName = intl.formatMessage(
    {
      defaultMessage: '{icon} Previous page',
      description: 'Pagination: previous page link',
      id: 'aMFqPH',
    },
    { icon: '←' }
  );
  const previousPageUrl = `${baseUrl}${current - 1}`;
  const hasNextPage = current < totalPages;
  const nextPageName = intl.formatMessage(
    {
      defaultMessage: 'Next page {icon}',
      description: 'Pagination: Next page link',
      id: 'R4yaW6',
    },
    { icon: '→' }
  );
  const nextPageUrl = `${baseUrl}${current + 1}`;

  /**
   * Create an array with a range of values from start value to end value.
   *
   * @param {number} start - The first value.
   * @param {number} end - The last value.
   * @returns {number[]} An array from start value to end value.
   */
  const range = (start: number, end: number): number[] => {
    const length = end - start + 1;

    return Array.from({ length }, (_, index) => index + start);
  };

  /**
   * Get the pagination range.
   *
   * @param currentPage - The current page number.
   * @param maxPages - The total pages number.
   * @returns {(number|string)[]} An array of page numbers with or without dots.
   */
  const getPaginationRange = (
    currentPage: number,
    maxPages: number
  ): (number | string)[] => {
    const dots = '\u2026';

    /**
     * Show left dots if current page less left siblings is greater than the
     * first two pages.
     */
    const hasLeftDots = currentPage - siblings > 2;

    /**
     * Show right dots if current page plus right siblings is lower than the
     * total of pages less the last page.
     */
    const hasRightDots = currentPage + siblings < maxPages - 1;

    if (hasLeftDots && hasRightDots) {
      const middleItems = range(currentPage - siblings, currentPage + siblings);
      return [1, dots, ...middleItems, dots, maxPages];
    }

    if (hasLeftDots) {
      const rightItems = range(currentPage - siblings, maxPages);
      return [1, dots, ...rightItems];
    }

    if (hasRightDots) {
      const leftItems = range(1, currentPage + siblings);
      return [...leftItems, dots, maxPages];
    }

    return range(1, maxPages);
  };

  /**
   * Get a link or a span wrapped in a list item.
   *
   * @param {string} id - The item id.
   * @param {ReactNode} body - The link body.
   * @param {string} [link] - An URL.
   * @returns {JSX.Element} The list item.
   */
  const getItem = (id: string, body: ReactNode, link?: string): JSX.Element => {
    const linkModifier = id.startsWith('page') ? 'link--number' : '';
    const kind = id === 'previous' || id === 'next' ? 'tertiary' : 'secondary';

    return (
      <li className={styles.item}>
        {link ? (
          <ButtonLink
            kind={kind}
            target={link}
            className={`${styles.link} ${styles[linkModifier]}`}
          >
            {body}
          </ButtonLink>
        ) : (
          <span className={`${styles.link} ${styles['link--disabled']}`}>
            {body}
          </span>
        )}
      </li>
    );
  };

  /**
   * Get the list of pages.
   *
   * @param {number} currentPage - The current page number.
   * @param {number} maxPages - The total of pages.
   * @returns {JSX.Element[]} The list items.
   */
  const getPages = (currentPage: number, maxPages: number): JSX.Element[] => {
    const pagesRange = getPaginationRange(currentPage, maxPages);

    return pagesRange.map((page, index) => {
      const id = typeof page === 'string' ? `dots-${index}` : `page-${page}`;
      const currentPagePrefix = intl.formatMessage({
        defaultMessage: 'You are here:',
        description: 'Pagination: current page indication',
        id: 'yE/Jdz',
      });
      const body =
        typeof page === 'string'
          ? page // dots
          : intl.formatMessage(
              {
                defaultMessage: '<a11y>Page </a11y>{number}',
                description: 'Pagination: page number',
                id: 'TSXPzr',
              },
              {
                number: page,
                a11y: (chunks: ReactNode) => (
                  <span className="screen-reader-text">
                    {page === currentPage && currentPagePrefix}
                    {chunks}
                  </span>
                ),
              }
            );
      const url =
        page === currentPage || typeof page === 'string'
          ? undefined
          : `${baseUrl}${page}`;

      return <Fragment key={`item-${id}`}>{getItem(id, body, url)}</Fragment>;
    });
  };

  return (
    <nav className={`${styles.wrapper} ${className}`} {...props}>
      <ul className={`${styles.list} ${styles['list--pages']}`}>
        {getPages(current, totalPages)}
      </ul>
      <ul className={styles.list}>
        {hasPreviousPage &&
          getItem('previous', previousPageName, previousPageUrl)}
        {hasNextPage && getItem('next', nextPageName, nextPageUrl)}
      </ul>
    </nav>
  );
};

export default Pagination;
