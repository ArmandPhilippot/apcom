import { FC } from 'react';
import styles from './heading.module.scss';

type HeadingProps = {
  /**
   * Adds additional classes.
   */
  additionalClasses?: string;
  /**
   * Use an heading element or only its styles. Default: false.
   */
  isFake?: boolean;
  /**
   * HTML heading level: 'h1', 'h2', 'h3', 'h4', 'h5' or 'h6'.
   */
  level: 1 | 2 | 3 | 4 | 5 | 6;
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
  additionalClasses,
  isFake = false,
  level,
  withMargin = true,
}) => {
  const TitleTag = isFake ? `p` : (`h${level}` as keyof JSX.IntrinsicElements);
  const variantClass = withMargin ? 'heading--margin' : 'heading--regular';
  const levelClass = `heading--${level}`;

  return (
    <TitleTag
      className={`${styles.heading} ${styles[variantClass]} ${styles[levelClass]} ${additionalClasses}`}
    >
      {children}
    </TitleTag>
  );
};

export default Heading;
