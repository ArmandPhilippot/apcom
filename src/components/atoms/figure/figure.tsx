import {
  forwardRef,
  type ReactNode,
  type ForwardRefRenderFunction,
  type HTMLAttributes,
  useId,
} from 'react';
import styles from './figure.module.scss';

export type FigureProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /**
   * The contents (ie. an image, illustration, diagram, code snippet, etc.).
   */
  children: ReactNode;
  /**
   * A figure caption.
   */
  caption?: ReactNode;
  /**
   * Should we wrap the contents with borders?
   */
  hasBorders?: boolean;
};

const FigureWithRef: ForwardRefRenderFunction<HTMLElement, FigureProps> = (
  {
    'aria-labelledby': ariaLabelledBy,
    caption,
    children,
    className = '',
    hasBorders,
    ...props
  },
  ref
) => {
  const captionId = useId();
  const bordersModifier = hasBorders ? styles['wrapper--has-borders'] : '';
  const figureClass = `${styles.wrapper} ${bordersModifier} ${className}`;

  /**
   * We need to ensure that the figcaption is used as an accessible name for the
   * figure. In Testing Library, it is not automatically associated, it could
   * also be the case in some browsers. However if the consumer provide its own
   * `aria-labelled-by` attribute, it should be used instead of the caption (we
   * could combine them but we cannot know which order is the more logical).
   */
  const figureLabelledBy =
    caption && !ariaLabelledBy ? captionId : ariaLabelledBy;

  return (
    <figure
      {...props}
      aria-labelledby={figureLabelledBy}
      className={figureClass}
      ref={ref}
    >
      {children}
      {caption ? (
        <figcaption className={styles.caption} id={captionId}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
};

/**
 * Figure component
 *
 * Render a responsive image wrapped in a figure element.
 */
export const Figure = forwardRef(FigureWithRef);
