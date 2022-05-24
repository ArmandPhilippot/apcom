import { FC, ReactNode } from 'react';
import Heading from '../headings/heading';
import styles from './section.module.scss';

export type SectionVariant = 'dark' | 'light';

export type SectionProps = {
  /**
   * Set additional classnames to the section element.
   */
  className?: string;
  /**
   * The section content.
   */
  content: ReactNode;
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
const Section: FC<SectionProps> = ({
  className = '',
  content,
  title,
  variant = 'dark',
  withBorder = true,
}) => {
  const borderClass = withBorder ? styles[`wrapper--borders`] : '';
  const variantClass = styles[`wrapper--${variant}`];

  return (
    <section
      className={`${styles.wrapper} ${borderClass} ${variantClass} ${className}`}
    >
      <Heading level={2} className={styles.title}>
        {title}
      </Heading>
      <div className={styles.body}>{content}</div>
    </section>
  );
};

export default Section;
