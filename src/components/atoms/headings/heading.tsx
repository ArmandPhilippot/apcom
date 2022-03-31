import { FC } from 'react';

type HeadingProps = {
  /**
   * HTML heading level: 'h1', 'h2', 'h3', 'h4', 'h5' or 'h6'.
   */
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

/**
 * Heading component.
 *
 * Render an HTML heading element.
 */
const Heading: FC<HeadingProps> = ({ children, level }) => {
  const TitleTag = `h${level}` as keyof JSX.IntrinsicElements;

  return <TitleTag>{children}</TitleTag>;
};

export default Heading;
