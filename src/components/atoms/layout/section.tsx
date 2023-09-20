import { FC, HTMLAttributes, ReactNode } from 'react';
import { Heading } from '../headings';
import styles from './section.module.scss';

export type SectionVariant = 'dark' | 'light';

export type SectionProps = Omit<
  HTMLAttributes<HTMLElement>,
  'children' | 'content'
> & {
  /**
   * The section content.
   */
  content: ReactNode | ReactNode[];
  /**
   * The section title.
   */
  title: string;
  /**
   * The section variant.
   */
  variant?: SectionVariant;
  /**
   * Add a border at the bottom of the section. Default: true.
   */
  withBorder?: boolean;
};

/**
 * Section component
 *
 * Render a section element.
 */
export const Section: FC<SectionProps> = ({
  className = '',
  content,
  title,
  variant = 'dark',
  withBorder = true,
  ...props
}) => {
  const borderClass = withBorder ? styles[`wrapper--borders`] : '';
  const variantClass = styles[`wrapper--${variant}`];
  const sectionClass = `${styles.wrapper} ${borderClass} ${variantClass} ${className}`;

  return (
    <section {...props} className={sectionClass}>
      <Heading level={2} className={styles.title}>
        {title}
      </Heading>
      <div className={styles.body}>{content}</div>
    </section>
  );
};
