import { forwardRef, type ForwardRefRenderFunction } from 'react';
import { Button, VisuallyHidden, type ButtonProps, Icon } from '../../../atoms';
import styles from './help-button.module.scss';

export type HelpButtonProps = Omit<
  ButtonProps,
  'aria-label' | 'children' | 'kind' | 'shape'
> & {
  /**
   * Define an accessible name for the button.
   */
  label: string;
};

const HelpButtonWithRef: ForwardRefRenderFunction<
  HTMLButtonElement,
  HelpButtonProps
> = ({ className = '', isPressed = false, label, ...props }, ref) => {
  const btnClass = `${styles.btn} ${className}`;

  return (
    <Button
      {...props}
      className={btnClass}
      isPressed={isPressed}
      ref={ref}
      // eslint-disable-next-line react/jsx-no-literals -- Shape allowed
      shape="circle"
    >
      {/* eslint-disable-next-line react/jsx-no-literals -- Config allowed */}
      <Icon aria-hidden className={styles.icon} shape="help" size="sm" />
      <VisuallyHidden>{label}</VisuallyHidden>
    </Button>
  );
};

/**
 * HelpButton component
 *
 * Render a button with an interrogation mark icon.
 */
export const HelpButton = forwardRef(HelpButtonWithRef);
