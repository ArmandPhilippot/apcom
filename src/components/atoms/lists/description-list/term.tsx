import {
  forwardRef,
  type ForwardRefRenderFunction,
  type HTMLAttributes,
} from 'react';
import styles from './description-list.module.scss';

export type TermProps = HTMLAttributes<HTMLElement>;

const TermWithRef: ForwardRefRenderFunction<HTMLElement, TermProps> = (
  { children, className = '', ...props },
  ref
) => {
  const termClass = `${styles.term} ${className}`;

  return (
    <dt {...props} className={termClass} ref={ref}>
      {children}
    </dt>
  );
};

/**
 * Term component.
 *
 * Use it inside a `DescriptionList` or a `Group` component.
 */
export const Term = forwardRef(TermWithRef);
