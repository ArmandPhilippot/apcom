import {
  forwardRef,
  type ForwardRefRenderFunction,
  type HTMLAttributes,
} from 'react';
import styles from './description-list.module.scss';

export type DescriptionProps = HTMLAttributes<HTMLElement>;

const DescriptionWithRef: ForwardRefRenderFunction<
  HTMLElement,
  DescriptionProps
> = ({ children, className = '', ...props }, ref) => {
  const descriptionClass = `${styles.description} ${className}`;

  return (
    <dd {...props} className={descriptionClass} ref={ref}>
      {children}
    </dd>
  );
};

/**
 * Description component.
 *
 * Use it inside a `DescriptionList` or a `Group` component.
 */
export const Description = forwardRef(DescriptionWithRef);
