import {
  createElement,
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from 'react';
import styles from './heading.module.scss';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = {
  /**
   * The title alignment. Default: left;
   */
  alignment?: 'center' | 'left';
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

type TitleTagProps = Pick<HeadingProps, 'children' | 'className' | 'id'> & {
  tagName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
};

const TitleTag = forwardRef<
  HTMLHeadingElement | HTMLParagraphElement,
  TitleTagProps
>(
  (
    { children, tagName, ...props },
    ref: ForwardedRef<HTMLHeadingElement | HTMLParagraphElement>
  ) => {
    return createElement(tagName, { ...props, ref }, children);
  }
);
TitleTag.displayName = 'TitleTag';

/**
 * Heading component.
 *
 * Render an HTML heading element or a paragraph with heading styles.
 */
const Heading: ForwardRefRenderFunction<HTMLDivElement, HeadingProps> = (
  {
    alignment = 'left',
    children,
    className,
    id,
    isFake = false,
    level,
    withMargin = true,
  },
  ref: ForwardedRef<HTMLHeadingElement | HTMLParagraphElement>
) => {
  const tagName = isFake ? 'p' : (`h${level}` as TitleTagProps['tagName']);
  const levelClass = `heading--${level}`;
  const alignmentClass = `heading--${alignment}`;
  const marginClass = withMargin ? 'heading--margin' : 'heading--regular';

  return (
    <TitleTag
      tagName={tagName}
      className={`${styles.heading} ${styles[levelClass]} ${styles[alignmentClass]} ${styles[marginClass]} ${className}`}
      id={id}
      ref={ref}
    >
      {children}
    </TitleTag>
  );
};

export default forwardRef(Heading);
