import {
  type ForwardedRef,
  forwardRef,
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import styles from './heading.module.scss';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  /**
   * The heading body.
   */
  children?: ReactNode;
  /**
   * Use an heading element or only its styles.
   *
   * @default false
   */
  isFake?: boolean;
  /**
   * HTML heading level.
   */
  level: HeadingLevel;
};

const HeadingWithRef: ForwardRefRenderFunction<
  HTMLHeadingElement | HTMLParagraphElement,
  HeadingProps
> = (
  { children, className = '', isFake = false, level, ...props },
  ref: ForwardedRef<HTMLHeadingElement | HTMLParagraphElement>
) => {
  const HeadingTag = `h${level}` as const;
  const levelClass = styles[`heading--${level}`];
  const headingClass = `${levelClass} ${className}`;

  return isFake ? (
    <p {...props} className={headingClass} ref={ref}>
      {children}
    </p>
  ) : (
    <HeadingTag {...props} className={headingClass} ref={ref}>
      {children}
    </HeadingTag>
  );
};

/**
 * Heading component.
 *
 * Render an HTML heading element or a paragraph with heading styles.
 */
export const Heading = forwardRef(HeadingWithRef);
