import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  forwardRef,
  type ReactNode,
} from 'react';
import styles from './flip.module.scss';

export type FlipSideProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /**
   * The side contents.
   */
  children: ReactNode;
  /**
   * Is it the back side of the flip component?
   *
   * @default false
   */
  isBack?: boolean;
};

const FlipSideWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  FlipSideProps
> = ({ children, className = '', isBack = false, ...props }, ref) => {
  const sideClass = [isBack ? styles.back : styles.front, className].join(' ');

  return (
    <div {...props} className={sideClass} ref={ref}>
      {children}
    </div>
  );
};

export const FlipSide = forwardRef(FlipSideWithRef);
