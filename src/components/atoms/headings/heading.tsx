import { FC, ReactNode } from 'react';
import styles from './heading.module.scss';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = {
  /**
   * The heading body.
   */
  children: ReactNode;
  /**
   * Set additional classnames.
   */
  className?: string;
  /**
   * The heading id.
   */
  id?: string;
  /**
   * Use an heading element or only its styles. Default: false.
   */
  isFake?: boolean;
  /**
   * HTML heading level.
   */
  level: HeadingLevel;
  /**
   * Adds margin. Default: true.
   */
  withMargin?: boolean;
};

/**
 * Heading component.
 *
 * Render an HTML heading element or a paragraph with heading styles.
 */
const Heading: FC<HeadingProps> = ({
  children,
  className,
  id,
  isFake = false,
  level,
  withMargin = true,
}) => {
  const TitleTag = isFake ? `p` : (`h${level}` as keyof JSX.IntrinsicElements);
  const levelClass = `heading--${level}`;
  const marginClass = withMargin ? 'heading--margin' : 'heading--regular';

  return (
    <TitleTag
      className={`${styles.heading} ${styles[levelClass]} ${styles[marginClass]} ${className}`}
      id={id}
    >
      {children}
    </TitleTag>
  );
};

export default Heading;
