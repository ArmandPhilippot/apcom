import {
  forwardRef,
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { useScrollLock } from '../../../utils/hooks';
import styles from './overlay.module.scss';

export type OverlayProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * The elements to display in front of the overlay.
   */
  children: ReactNode;
  /**
   * Should the overlay be visible?
   *
   * Use it if you want an animated overlay instead of mounting/demounting it.
   *
   * @default true
   */
  isVisible?: boolean;
};

const OverlayWithRef: ForwardRefRenderFunction<HTMLDivElement, OverlayProps> = (
  { children, className = '', isVisible = true, ...props },
  ref
) => {
  const overlayClass = [
    styles.overlay,
    styles[isVisible ? 'overlay--visible' : 'overlay--hidden'],
    className,
  ].join(' ');

  useScrollLock(isVisible);

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
