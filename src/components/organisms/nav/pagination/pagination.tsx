import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { ButtonLink, Icon, Nav, type NavProps } from '../../../atoms';
import { NavItem, NavList } from '../../../molecules';
import styles from './pagination.module.scss';

export type PaginationItemKind = 'backward' | 'forward' | 'number';

type RenderPaginationItemAriaLabelProps = {
  /**
   * Does the item represent the current page?
   */
  isCurrentPage?: boolean;
  /**
   * The item kind.
   */
  kind: PaginationItemKind;
  /**
   * The linked page number.
   */
  pageNumber: number;
};

export type RenderPaginationItemAriaLabel = (
  props: RenderPaginationItemAriaLabelProps
) => string;

export type RenderPaginationLink = (page: number) => string;

export type PaginationProps = Omit<NavProps, 'children'> & {
  /**
   * The currently active page number.
   */
  current: number;
  /**
   * Function used to provide an accessible label to pagination items.
   */
  renderItemAriaLabel: RenderPaginationItemAriaLabel;
  /**
   * Function used to create the href provided for each page link.
   */
  renderLink: RenderPaginationLink;
  /**
   * The number of pages to show on each side of the current page.
   *
   * @default 1
   */
  siblings?: number;
  /**
   * The total number of pages.
   */
  total: number;
};

type GetPagesProps = Pick<PaginationProps, 'current' | 'total'> & {
  displayRange: number;
};

const getPages = ({ current, displayRange, total }: GetPagesProps) =>
  Array.from({ length: total }, (_, index) => {
    const page = index + 1;
    const isFirstPage = page === 1;
    const isLastPage = page === total;
    const isOutOfRangeFromStart = page < current - displayRange && !isFirstPage;
    const isOutOfRangeFromEnd = page > current + displayRange && !isLastPage;
    const isOutOfRange = isOutOfRangeFromStart || isOutOfRangeFromEnd;
    const ellipsisId = isOutOfRangeFromStart
      ? 'start-ellipsis'
      : 'end-ellipsis';

    return {
      id: isOutOfRange ? ellipsisId : `page-${page}`,
      number: isOutOfRangeFromStart || isOutOfRangeFromEnd ? null : page,
    };
  }).filter(
    (page, index, allPages) =>
      index === 0 || page.number !== allPages[index - 1]?.number
  );

const PaginationWithRef: ForwardRefRenderFunction<
  HTMLElement,
  PaginationProps
> = (
  {
    className = '',
    current,
    renderItemAriaLabel,
    renderLink,
    siblings = 1,
    total,
    ...props
  },
  ref
) => {
  const paginationClass = `${styles.wrapper} ${className}`;
  const displayRange =
    current === 1 || current === total ? siblings + 1 : siblings;
  const hasPreviousPage = current > 1;
  const hasNextPage = current < total;
  const pages = getPages({ current, displayRange, total });
  const ellipsis = '\u2026' as const;

  return (
    <Nav {...props} className={paginationClass} ref={ref}>
      <NavList
        className={styles.list}
        isInline
        // eslint-disable-next-line react/jsx-no-literals
        spacing="xs"
      >
        {hasPreviousPage ? (
          <NavItem className={styles.item}>
            <ButtonLink
              aria-label={renderItemAriaLabel({
                kind: 'backward',
                pageNumber: current - 1,
              })}
              // eslint-disable-next-line react/jsx-no-literals
              kind="secondary"
              to={renderLink(current - 1)}
            >
              <Icon
                aria-hidden
                // eslint-disable-next-line react/jsx-no-literals
                shape="arrow"
                // eslint-disable-next-line react/jsx-no-literals
                orientation="left"
              />
            </ButtonLink>
          </NavItem>
        ) : null}
        {pages.map((page) => {
          const isCurrentPage = page.number === current;

          return (
            <NavItem className={styles.item} key={page.id}>
              <ButtonLink
                aria-current={isCurrentPage ? 'page' : undefined}
                aria-label={
                  page.number
                    ? renderItemAriaLabel({
                        isCurrentPage,
                        kind: 'number',
                        pageNumber: page.number,
                      })
                    : undefined
                }
                isDisabled={page.number === null || isCurrentPage}
                // eslint-disable-next-line react/jsx-no-literals
                kind="secondary"
                to={page.number ? renderLink(page.number) : ''}
              >
                {page.number ?? ellipsis}
              </ButtonLink>
            </NavItem>
          );
        })}
        {hasNextPage ? (
          <NavItem className={styles.item}>
            <ButtonLink
              aria-label={renderItemAriaLabel({
                kind: 'forward',
                pageNumber: current + 1,
              })}
              // eslint-disable-next-line react/jsx-no-literals
              kind="secondary"
              to={renderLink(current + 1)}
            >
              <Icon
                aria-hidden
                // eslint-disable-next-line react/jsx-no-literals
                shape="arrow"
                // eslint-disable-next-line react/jsx-no-literals
                orientation="right"
              />
            </ButtonLink>
          </NavItem>
        ) : null}
      </NavList>
    </Nav>
  );
};

export const Pagination = forwardRef(PaginationWithRef);
