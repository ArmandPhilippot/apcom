import {
  type ForwardRefRenderFunction,
  forwardRef,
  type HTMLAttributes,
} from 'react';
import { useIntl } from 'react-intl';
import { Article } from '../../atoms';
import { Breadcrumbs, type BreadcrumbsItem } from '../../organisms/nav';
import styles from './page.module.scss';

export type PageProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The breadcrumbs items.
   */
  breadcrumbs?: BreadcrumbsItem[];
  /**
   * Is it a regular page or a sectioned one?
   *
   * @default false
   */
  hasSections?: boolean;
  /**
   * Add an extra padding to the body when there are no footer/comments.
   *
   * Note: this should be refactored when `:has()` pseudo-class will have a
   * better support.
   *
   * @default false
   */
  isBodyLastChild?: boolean;
};

const PageWithRef: ForwardRefRenderFunction<HTMLDivElement, PageProps> = (
  {
    breadcrumbs,
    children,
    className = '',
    hasSections = false,
    isBodyLastChild = false,
    ...props
  },
  ref
) => {
  const wrapperClass = `${styles.wrapper} ${className}`;
  const pageClass = [
    styles.page,
    styles[hasSections ? 'page--full' : 'page--regular'],
    styles[isBodyLastChild ? 'page--body-last' : ''],
  ].join(' ');
  const intl = useIntl();
  const breadcrumbsLabel = intl.formatMessage({
    defaultMessage: 'Breadcrumbs',
    description: 'Page: an accessible name for the breadcrumb nav.',
    id: '/TTRRX',
  });

  return (
    <div {...props} className={wrapperClass} ref={ref}>
      {breadcrumbs ? (
        <Breadcrumbs
          aria-label={breadcrumbsLabel}
          className={styles.breadcrumbs}
          items={breadcrumbs}
        />
      ) : null}
      <Article className={pageClass}>{children}</Article>
    </div>
  );
};

export const Page = forwardRef(PageWithRef);
