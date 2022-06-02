import Button, { type ButtonProps } from '@components/atoms/buttons/button';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import styles from './help-button.module.scss';

export type HelpButtonProps = Pick<
  ButtonProps,
  'aria-pressed' | 'className' | 'onClick'
>;

/**
 * HelpButton component
 *
 * Render a button with an interrogation mark icon.
 */
const HelpButton: ForwardRefRenderFunction<
  HTMLButtonElement,
  HelpButtonProps
> = ({ className = '', ...props }, ref) => {
  const intl = useIntl();
  const text = intl.formatMessage({
    defaultMessage: 'Help',
    id: 'i+/ckF',
    description: 'HelpButton: screen reader text',
  });

  return (
    <Button
      className={`${styles.btn} ${className}`}
      ref={ref}
      shape="circle"
      {...props}
    >
      <span className="screen-reader-text">{text}</span>
      <span className={styles.icon}>?</span>
    </Button>
  );
};

export default forwardRef(HelpButton);
