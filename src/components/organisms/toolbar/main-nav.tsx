import Checkbox, { type CheckboxProps } from '@components/atoms/forms/checkbox';
import Label from '@components/atoms/forms/label';
import Hamburger from '@components/atoms/icons/hamburger';
import Nav, {
  type NavProps,
  type NavItem,
} from '@components/molecules/nav/nav';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import mainNavStyles from './main-nav.module.scss';
import sharedStyles from './toolbar-items.module.scss';

export type MainNavProps = {
  /**
   * Set additional classnames to the nav element.
   */
  className?: NavProps['className'];
  /**
   * The button state.
   */
  isActive: CheckboxProps['value'];
  /**
   * The main nav items.
   */
  items: NavItem[];
  /**
   * A callback function to handle button state.
   */
  setIsActive: CheckboxProps['setValue'];
};

/**
 * MainNav component
 *
 * Render the main navigation.
 */
const MainNav: ForwardRefRenderFunction<HTMLDivElement, MainNavProps> = (
  { className = '', isActive, items, setIsActive },
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
      <Checkbox
        id="main-nav-button"
        name="main-nav-button"
        value={isActive}
        setValue={setIsActive}
        className={`${sharedStyles.checkbox} ${mainNavStyles.checkbox}`}
      />
      <Label
        htmlFor="main-nav-button"
        aria-label={label}
        className={`${sharedStyles.label} ${mainNavStyles.label}`}
      >
        <Hamburger iconClassName={mainNavStyles.icon} />
      </Label>
      <Nav
        kind="main"
        items={items}
        className={`${sharedStyles.modal} ${mainNavStyles.modal} ${className}`}
        listClassName={mainNavStyles.modal__list}
      />
    </div>
  );
};

export default forwardRef(MainNav);
