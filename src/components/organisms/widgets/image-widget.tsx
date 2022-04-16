import ResponsiveImage, {
  type ResponsiveImageProps,
} from '@components/molecules/images/responsive-image';
import Widget, { type WidgetProps } from '@components/molecules/layout/widget';
import { FC } from 'react';
import styles from './image-widget.module.scss';

export type Alignment = 'left' | 'center' | 'right';

export type Image = Pick<
  ResponsiveImageProps,
  'alt' | 'height' | 'src' | 'width'
>;

export type ImageWidgetProps = Pick<
  WidgetProps,
  'expanded' | 'level' | 'title'
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
  img: Image;
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
  description,
  img,
  url,
  ...props
}) => {
  const alignmentClass = `widget--${alignment}`;

  return (
    <Widget className={styles[alignmentClass]} {...props}>
      <ResponsiveImage
        target={url}
        caption={description}
        className={styles.img}
        {...img}
      />
    </Widget>
  );
};

export default ImageWidget;
