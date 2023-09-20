import {
  createElement,
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  ReactNode,
} from 'react';
import styles from './heading.module.scss';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  /**
   * The title alignment. Default: left;
   */
  alignment?: 'center' | 'left';
  /**
   * The heading body.
   */
  children: ReactNode;
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

const HeadingWithRef: ForwardRefRenderFunction<
  HTMLHeadingElement | HTMLParagraphElement,
  HeadingProps
> = (
  {
    alignment = 'left',
    children,
    className = '',
    id,
    isFake = false,
    level,
    withMargin = true,
    ...props
  },
  ref: ForwardedRef<HTMLHeadingElement | HTMLParagraphElement>
) => {
  const tagName = isFake ? 'p' : (`h${level}` as TitleTagProps['tagName']);
  const levelClass = `heading--${level}`;
  const alignmentClass = `heading--${alignment}`;
  const marginClass = withMargin ? 'heading--margin' : 'heading--regular';
  const headingClass = `${styles.heading} ${styles[levelClass]} ${styles[alignmentClass]} ${styles[marginClass]} ${className}`;

  return (
    <TitleTag
      {...props}
      className={headingClass}
      id={id}
      ref={ref}
      tagName={tagName}
    >
      {children}
    </TitleTag>
  );
};

/**
 * Heading component.
 *
 * Render an HTML heading element or a paragraph with heading styles.
 */
export const Heading = forwardRef(HeadingWithRef);
