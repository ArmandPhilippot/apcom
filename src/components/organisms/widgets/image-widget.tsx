import ResponsiveImage from '@components/molecules/images/responsive-image';
import Widget, { type WidgetProps } from '@components/molecules/layout/widget';
import { VFC } from 'react';
import styles from './image-widget.module.scss';

export type Alignment = 'left' | 'center' | 'right';

export type Image = {
  /**
   * An alternative text for the image.
   */
  alt: string;
  /**
   * The image height.
   */
  height: number;
  /**
   * The image source.
   */
  src: string;
  /**
   * The image width.
   */
  width: number;
};

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
  description?: string;
  /**
   * An object describing the image.
   */
  img: Image;
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
const ImageWidget: VFC<ImageWidgetProps> = ({
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
