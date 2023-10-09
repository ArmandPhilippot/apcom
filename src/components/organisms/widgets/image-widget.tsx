import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import type { FC } from 'react';
import { Figure, Link, type FigureProps } from '../../atoms';
import { Collapsible, type CollapsibleProps } from '../../molecules';
import styles from './image-widget.module.scss';

export type Alignment = 'left' | 'center' | 'right';

export type Image = Pick<NextImageProps, 'alt' | 'height' | 'src' | 'width'>;

export type ImageWidgetProps = Omit<
  CollapsibleProps,
  'children' | 'onToggle'
> & {
  /**
   * The content alignment.
   */
  alignment?: Alignment;
  /**
   * Add a caption to the image.
   */
  description?: FigureProps['caption'];
  /**
   * An object describing the image.
   */
  image: Image;
  /**
   * Set additional classnames to the image wrapper.
   */
  imageClassName?: string;
  /**
   * Add a link to the image.
   */
  url?: string;
};

/**
 * ImageWidget component
 *
 * Renders a widget that print an image and an optional text.
 */
export const ImageWidget: FC<ImageWidgetProps> = ({
  alignment = 'left',
  className = '',
  description,
  image,
  imageClassName = '',
  isCollapsed,
  url,
  ...props
}) => {
  const alignmentClass = `widget--${alignment}`;

  return (
    <Collapsible
      {...props}
      className={`${styles[alignmentClass]} ${className}`}
    >
      <Figure
        caption={description}
        className={`${styles.figure} ${imageClassName}`}
        hasBorders
      >
        {url ? (
          <Link href={url}>
            <NextImage {...image} />
          </Link>
        ) : (
          <NextImage {...image} />
        )}
      </Figure>
    </Collapsible>
  );
};
