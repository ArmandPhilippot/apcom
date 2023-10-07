import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';
import styles from './flip.module.scss';

export type FlipProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /**
   * The front and back sides.
   */
  children: ReactNode;
  /**
   * The animation direction.
   *
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Should we show back side?
   *
   * It let you control dynamically which side to show. When set to `true` the
   * hover/focus animation will be removed.
   *
   * @default undefined
   */
  showBack?: boolean;
};

const FlipWithRef: ForwardRefRenderFunction<HTMLDivElement, FlipProps> = (
  { children, className = '', direction = 'horizontal', showBack, ...props },
  ref
) => {
  const wrapperClass = [
    styles.wrapper,
    styles[`wrapper--${direction}`],
    styles[showBack === undefined ? 'wrapper--dynamic' : 'wrapper--manual'],
    styles[showBack ? 'wrapper--is-back' : 'wrapper--is-front'],
    className,
  ].join(' ');

  return (
    <div {...props} className={wrapperClass} ref={ref}>
      {children}
    </div>
  );
};

export const Flip = forwardRef(FlipWithRef);
