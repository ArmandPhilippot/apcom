import { settings } from '@utils/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import styles from './Pagination.module.scss';

const Pagination = ({ baseUrl, total }: { baseUrl: string; total: number }) => {
  const intl = useIntl();
  const { asPath } = useRouter();
  const totalPages = Math.floor(total / settings.postsPerPage);
  const currentPage = asPath.includes('/page/')
    ? Number(asPath.split(`${baseUrl}/page/`)[1])
    : 1;
  const hasPreviousPage = currentPage !== 1;
  const hasNextPage = currentPage !== totalPages;

  const getPreviousPageItem = () => {
    return (
      <li className={styles.item}>
        <Link href={`${baseUrl}/page/${currentPage - 1}`}>
          <a className={styles.link}>
            {intl.formatMessage(
              {
                defaultMessage: '{icon} Previous page',
                description: 'Pagination: previous page link',
                id: 'aMFqPH',
              },
              { icon: '←' }
            )}
          </a>
        </Link>
      </li>
    );
  };

  const getNextPageItem = () => {
    return (
      <li className={styles.item}>
        <Link href={`${baseUrl}/page/${currentPage + 1}`}>
          <a className={styles.link}>
            {intl.formatMessage(
              {
                defaultMessage: 'Next page {icon}',
                description: 'Pagination: Next page link',
                id: 'R4yaW6',
              },
              { icon: '→' }
            )}
          </a>
        </Link>
      </li>
    );
  };

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        pages.push({
          id: `page-${i}`,
          link: (
            <span className={`${styles.link} ${styles['link--current']}`}>
              {intl.formatMessage(
                {
                  defaultMessage: '<a11y>Page </a11y>{number}',
                  description: 'Pagination: page number',
                  id: 'TSXPzr',
                },
                {
                  number: i,
                  a11y: (chunks: string) => (
                    <span className="screen-reader-text">{chunks}</span>
                  ),
                }
              )}
            </span>
          ),
        });
      } else {
        pages.push({
          id: `page-${i}`,
          link: (
            <Link href={`${baseUrl}/page/${i}`}>
              <a className={styles.link}>
                {intl.formatMessage(
                  {
                    defaultMessage: '<a11y>Page </a11y>{number}',
                    description: 'Pagination: page number',
                    id: 'TSXPzr',
                  },
                  {
                    number: i,
                    a11y: (chunks: string) => (
                      <span className="screen-reader-text">{chunks}</span>
                    ),
                  }
                )}
              </a>
            </Link>
          ),
        });
      }
    }

    return pages;
  };

  const getItems = () => {
    const pages = getPages();

    return pages.map((page) => (
      <li key={page.id} className={styles.item}>
        {page.link}
      </li>
    ));
  };

  return (
    <nav className={styles.wrapper} aria-labelledby="pagination-title">
      <h2 id="pagination-title" className="screen-reader-text">
        {intl.formatMessage({
          defaultMessage: 'Pagination',
          description: 'Pagination: pagination title',
          id: 'BAkq7J',
        })}
      </h2>
      <ul className={styles.list}>
        {hasPreviousPage && getPreviousPageItem()}
        {getItems()}
        {hasNextPage && getNextPageItem()}
      </ul>
    </nav>
  );
};

export default Pagination;
