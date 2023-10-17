import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { Heading, type HeadingProps } from '../../atoms';
import styles from './card.module.scss';

export type CardTitleProps = Omit<HeadingProps, 'level'> & {
  /**
   * The title level (between 1 and 6).
   *
   * @default 2
   */
  level?: HeadingProps['level'];
};

const CardTitleWithRef: ForwardRefRenderFunction<
  HTMLHeadingElement,
  CardTitleProps
> = ({ children, className = '', level = 2, ...props }, ref) => {
  const headingClass = `${styles.title} ${className}`;

  return (
    <Heading {...props} className={headingClass} level={level} ref={ref}>
      {children}
    </Heading>
  );
};

export const CardTitle = forwardRef(CardTitleWithRef);
