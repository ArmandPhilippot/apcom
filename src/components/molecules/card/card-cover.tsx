import {
  type ForwardRefRenderFunction,
  type ReactElement,
  forwardRef,
} from 'react';
import { Figure, type FigureProps } from '../../atoms';
import styles from './card.module.scss';

export type CardCoverProps = Omit<FigureProps, 'caption' | 'children'> & {
  /**
   * The cover.
   */
  children: ReactElement;
};

const CardCoverWithRef: ForwardRefRenderFunction<
  HTMLElement,
  CardCoverProps
> = ({ className = '', children, ...props }, ref) => {
  const coverClass = `${styles.cover} ${className}`;

  return (
    <Figure {...props} className={coverClass} ref={ref}>
      {children}
    </Figure>
  );
};

export const CardCover = forwardRef(CardCoverWithRef);
