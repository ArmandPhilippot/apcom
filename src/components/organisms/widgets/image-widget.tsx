import type { FC } from 'react';
import {
  ResponsiveImage,
  type ResponsiveImageProps,
  Collapsible,
  type CollapsibleProps,
} from '../../molecules';
import styles from './image-widget.module.scss';

export type Alignment = 'left' | 'center' | 'right';

export type Image = Pick<
  ResponsiveImageProps,
  'alt' | 'height' | 'src' | 'width'
>;

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
  description?: ResponsiveImageProps['caption'];
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
  url?: ResponsiveImageProps['target'];
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
      <ResponsiveImage
        {...image}
        caption={description}
        className={`${styles.figure} ${imageClassName}`}
        target={url}
      />
    </Collapsible>
  );
};
