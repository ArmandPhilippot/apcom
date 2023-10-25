import { forwardRef, type ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import { BooleanField, type BooleanFieldProps, Icon, Label } from '../../atoms';
import { type MainNavItem as Item, MainNav } from '../nav';
import mainNavStyles from './main-nav.module.scss';
import sharedStyles from './toolbar-items.module.scss';

export type MainNavItemProps = {
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
  items: Item[];
  /**
   * A callback function to handle button state.
   */
  setIsActive: BooleanFieldProps['onChange'];
};

const MainNavItemWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  MainNavItemProps
> = ({ className = '', isActive = false, items, setIsActive }, ref) => {
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
      <MainNav
        className={`${sharedStyles.modal} ${mainNavStyles.modal} ${className}`}
        items={items}
      />
    </div>
  );
};

/**
 * MainNavItem component
 *
 * Render the main navigation as toolbar item.
 */
export const MainNavItem = forwardRef(MainNavItemWithRef);
