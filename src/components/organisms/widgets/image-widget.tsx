import { FC } from 'react';
import ResponsiveImage, {
  type ResponsiveImageProps,
} from '../../molecules/images/responsive-image';
import Widget, { type WidgetProps } from '../../molecules/layout/widget';
import styles from './image-widget.module.scss';

export type Alignment = 'left' | 'center' | 'right';

export type Image = Pick<
  ResponsiveImageProps,
  'alt' | 'height' | 'src' | 'width'
>;

export type ImageWidgetProps = Pick<
  WidgetProps,
  'className' | 'expanded' | 'level' | 'title'
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
const ImageWidget: FC<ImageWidgetProps> = ({
  alignment = 'left',
  className = '',
  description,
  image,
  imageClassName = '',
  url,
  ...props
}) => {
  const alignmentClass = `widget--${alignment}`;

  return (
    <Widget className={`${styles[alignmentClass]} ${className}`} {...props}>
      <ResponsiveImage
        target={url}
        caption={description}
        className={`${styles.figure} ${imageClassName}`}
        {...image}
      />
    </Widget>
  );
};

export default ImageWidget;
