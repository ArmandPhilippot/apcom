import Checkbox, { CheckboxProps } from '@components/atoms/forms/checkbox';
import Label from '@components/atoms/forms/label';
import Hamburger from '@components/atoms/icons/hamburger';
import { VFC } from 'react';
import { useIntl } from 'react-intl';
import styles from './main-nav-button.module.scss';

export type MainNavButtonProps = {
  /**
   * Set additional classnames to the checkbox.
   */
  checkboxClassName?: string;
  /**
   * The button state.
   */
  isActive: CheckboxProps['value'];
  /**
   * Set additional classnames to the label.
   */
  labelClassName?: string;
  /**
   * A callback function to handle button state.
   */
  setIsActive: CheckboxProps['setValue'];
};

/**
 * MainNavButton component
 *
 * Render a hamburger icon or a close icon depending on state.
 */
const MainNavButton: VFC<MainNavButtonProps> = ({
  checkboxClassName = '',
  isActive,
  labelClassName = '',
  setIsActive,
}) => {
  const intl = useIntl();
  const label = isActive
    ? intl.formatMessage({
        defaultMessage: 'Close menu',
        id: 'wT7YZb',
        description: 'MainNavButton: close menu label',
      })
    : intl.formatMessage({
        defaultMessage: 'Open menu',
        id: 'P7j8ZZ',
        description: 'MainNavButton: open menu label',
      });
  const hamburgerModifier = isActive ? 'icon--active' : '';

  return (
    <>
      <Checkbox
        id="main-nav-button"
        name="main-nav-button"
        value={isActive}
        setValue={setIsActive}
        className={`${styles.checkbox} ${checkboxClassName}`}
      />
      <Label
        htmlFor="main-nav-button"
        className={`${styles.label} ${labelClassName}`}
        aria-label={label}
      >
        <Hamburger
          className={styles.icon__wrapper}
          iconClassName={styles[hamburgerModifier]}
        />
      </Label>
    </>
  );
};

export default MainNavButton;
