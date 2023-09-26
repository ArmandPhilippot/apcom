import { forwardRef, type ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import { Button, type ButtonProps } from '../../atoms';
import styles from './help-button.module.scss';

export type HelpButtonProps = Pick<
  ButtonProps,
  'className' | 'isPressed' | 'onClick'
>;

const HelpButtonWithRef: ForwardRefRenderFunction<
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

/**
 * HelpButton component
 *
 * Render a button with an interrogation mark icon.
 */
export const HelpButton = forwardRef(HelpButtonWithRef);
