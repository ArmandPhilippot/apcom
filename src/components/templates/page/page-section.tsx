import { type ForwardRefRenderFunction, forwardRef } from 'react';
import { Section, type SectionProps } from '../../atoms';
import styles from './page.module.scss';

export type PageSectionVariant = 'dark' | 'light';

export type PageSectionProps = SectionProps & {
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
  variant?: PageSectionVariant;
};

const PageSectionWithRef: ForwardRefRenderFunction<
  HTMLElement,
  PageSectionProps
> = (
  { children, className = '', hasBorder = false, variant = 'light', ...props },
  ref
) => {
  const sectionClass = [
    styles.section,
    styles[hasBorder ? 'section--bordered' : ''],
    styles[`section--${variant}`],
    className,
  ].join(' ');

  return (
    <Section {...props} className={sectionClass} ref={ref}>
      <div className={styles.section__body}>{children}</div>
    </Section>
  );
};

export const PageSection = forwardRef(PageSectionWithRef);
