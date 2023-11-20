import {
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  forwardRef,
} from 'react';
import styles from './page.module.scss';

export type PageBodyProps = HTMLAttributes<HTMLDivElement>;

const PageBodyWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  PageBodyProps
> = ({ children, className = '', ...props }, ref) => {
  const bodyClass = `${styles.body} ${className}`;

  return (
    <div {...props} className={bodyClass} ref={ref}>
      {children}
    </div>
  );
};

export const PageBody = forwardRef(PageBodyWithRef);
