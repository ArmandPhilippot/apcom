import {
  forwardRef,
  type ReactNode,
  type ForwardRefRenderFunction,
} from 'react';
import { useIntl } from 'react-intl';
import {
  BooleanField,
  type BooleanFieldProps,
  Icon,
  Label,
  Nav,
} from '../../atoms';
import { NavList, NavItem, NavLink } from '../../molecules';
import mainNavStyles from './main-nav.module.scss';
import sharedStyles from './toolbar-items.module.scss';

export type MainNavItem = {
  id: string;
  href: string;
  label: string;
  logo?: ReactNode;
};

export type MainNavProps = {
  /**
   * Set additional classnames to the nav element.
   */
  className?: string;
  /**
   * The button state.
   */
  isActive: BooleanFieldProps['isChecked'];
  /**
   * The main nav items.
   */
  items: MainNavItem[];
  /**
   * A callback function to handle button state.
   */
  setIsActive: BooleanFieldProps['onChange'];
};

const MainNavWithRef: ForwardRefRenderFunction<HTMLDivElement, MainNavProps> = (
  { className = '', isActive = false, items, setIsActive },
  ref
) => {
  const intl = useIntl();
  const label = isActive
    ? intl.formatMessage({
        defaultMessage: 'Close menu',
        description: 'MainNav: Close label',
        id: 'aJC7D2',
      })
    : intl.formatMessage({
        defaultMessage: 'Open menu',
        description: 'MainNav: Open label',
        id: 'GTbGMy',
      });

  return (
    <div className={`${sharedStyles.item} ${mainNavStyles.item}`} ref={ref}>
      <BooleanField
        className={`${sharedStyles.checkbox} ${mainNavStyles.checkbox}`}
        id="main-nav-button"
        isChecked={isActive}
        name="main-nav-button"
        onChange={setIsActive}
        type="checkbox"
        value="open"
      />
      <Label
        aria-label={label}
        className={`${sharedStyles.label} ${mainNavStyles.label}`}
        htmlFor="main-nav-button"
      >
        <Icon shape="hamburger" />
      </Label>
      <Nav
        className={`${sharedStyles.modal} ${mainNavStyles.modal} ${className}`}
      >
        <NavList isInline spacing="2xs">
          {items.map(({ id, ...link }) => (
            <NavItem key={id}>
              <NavLink {...link} isStack variant="main" />
            </NavItem>
          ))}
        </NavList>
      </Nav>
    </div>
  );
};

/**
 * MainNav component
 *
 * Render the main navigation.
 */
export const MainNav = forwardRef(MainNavWithRef);
