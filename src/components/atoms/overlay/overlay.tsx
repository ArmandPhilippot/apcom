import {
  forwardRef,
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import styles from './overlay.module.scss';

export type OverlayProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The elements to display in front of the overlay.
   */
  children: ReactNode;
};

const OverlayWithRef: ForwardRefRenderFunction<HTMLDivElement, OverlayProps> = (
  { children, className = '', ...props },
  ref
) => {
  const overlayClass = [styles.overlay, className].join(' ');

  return (
    <div {...props} className={overlayClass} ref={ref}>
      {children}
    </div>
  );
};

/**
 * Overlay component.
 */
export const Overlay = forwardRef(OverlayWithRef);
