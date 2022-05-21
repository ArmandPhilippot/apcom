import Button, { type ButtonProps } from '@components/atoms/buttons/button';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import styles from './help-button.module.scss';

export type HelpButtonProps = Pick<ButtonProps, 'onClick'> & {
  /**
   * Set additional classnames to the button wrapper.
   */
  className?: string;
};

/**
 * HelpButton component
 *
 * Render a button with an interrogation mark icon.
 */
const HelpButton: ForwardRefRenderFunction<
  HTMLButtonElement,
  HelpButtonProps
> = ({ className = '', onClick }, ref) => {
  const intl = useIntl();
  const text = intl.formatMessage({
    defaultMessage: 'Help',
    id: 'i+/ckF',
    description: 'HelpButton: screen reader text',
  });

  return (
    <Button
      className={`${styles.btn} ${className}`}
      onClick={onClick}
      ref={ref}
      shape="circle"
    >
      <span className="screen-reader-text">{text}</span>
      <span className={styles.icon}>?</span>
    </Button>
  );
};

export default forwardRef(HelpButton);
