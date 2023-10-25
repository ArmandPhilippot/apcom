import {
  type ForwardRefRenderFunction,
  type ReactNode,
  forwardRef,
} from 'react';
import { Nav, type NavProps } from '../../../atoms';
import { NavItem, NavLink, NavList } from '../../../molecules';

export type MainNavItem = {
  id: string;
  href: string;
  label: string;
  logo?: ReactNode;
};

export type MainNavProps = Omit<NavProps, 'children'> & {
  /**
   * The main nav items.
   */
  items: MainNavItem[];
};

const MainNavWithRef: ForwardRefRenderFunction<HTMLElement, MainNavProps> = (
  { className = '', items, ...props },
  ref
) => {
  const wrapperClass = `${className}`;

  return (
    <Nav {...props} className={wrapperClass} ref={ref}>
      <NavList isInline spacing="2xs">
        {items.map(({ id, ...link }) => (
          <NavItem key={id}>
            <NavLink {...link} isStack variant="main" />
          </NavItem>
        ))}
      </NavList>
    </Nav>
  );
};

/**
 * MainNav component
 *
 * Render the main navigation.
 */
export const MainNav = forwardRef(MainNavWithRef);
