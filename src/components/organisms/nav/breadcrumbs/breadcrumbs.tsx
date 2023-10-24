import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { Nav, VisuallyHidden, type NavProps } from '../../../atoms';
import { NavItem, NavLink, NavList } from '../../../molecules';
import styles from './breadcrumbs.module.scss';

export type BreadcrumbsItem = {
  /**
   * The item id.
   */
  id: string;
  /**
   * The item URL.
   */
  url: string;
  /**
   * The item name.
   */
  name: string;
};

export type BreadcrumbsProps = Omit<NavProps, 'children'> & {
  /**
   * The breadcrumbs items.
   */
  items: BreadcrumbsItem[];
};

const BreadcrumbsWithRef: ForwardRefRenderFunction<
  HTMLElement,
  BreadcrumbsProps
> = ({ className = '', items, ...props }, ref) => {
  const wrapperClass = `${styles.wrapper} ${className}`;
  const sep = '>';

  return (
    <Nav {...props} className={wrapperClass} ref={ref}>
      <NavList
        isInline
        isOrdered
        // eslint-disable-next-line react/jsx-no-literals
        spacing="xs"
      >
        {items.map((item, index) => {
          const isLastItem = items.length === index + 1;

          return (
            <NavItem key={item.id}>
              {isLastItem ? (
                <VisuallyHidden>{item.name}</VisuallyHidden>
              ) : (
                <>
                  <NavLink href={item.url} label={item.name} />
                  <span aria-hidden className={styles.sep}>
                    {sep}
                  </span>
                </>
              )}
            </NavItem>
          );
        })}
      </NavList>
    </Nav>
  );
};

export const Breadcrumbs = forwardRef(BreadcrumbsWithRef);
