import {
  forwardRef,
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import styles from './section.module.scss';

export type SectionVariant = 'dark' | 'light';

export type SectionProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /**
   * The section content.
   */
  children: ReactNode | ReactNode[];
  /**
   * Add a border at the bottom of the section.
   *
   * @default false
   */
  hasBorder?: boolean;
  /**
   * The section variant.
   *
   * @default 'light'
   */
  variant?: SectionVariant;
};

const SectionWithRef: ForwardRefRenderFunction<HTMLElement, SectionProps> = (
  { children, className = '', hasBorder = false, variant = 'light', ...props },
  ref
) => {
  const borderClass = hasBorder ? styles[`wrapper--borders`] : '';
  const variantClass = styles[`wrapper--${variant}`];
  const sectionClass = `${styles.wrapper} ${borderClass} ${variantClass} ${className}`;

  return (
    <section {...props} className={sectionClass} ref={ref}>
      {children}
    </section>
  );
};

/**
 * Section component
 *
 * Render a section element with a heading and a body.
 */
export const Section = forwardRef(SectionWithRef);
