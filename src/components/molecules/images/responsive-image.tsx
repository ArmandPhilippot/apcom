import Link, { type LinkProps } from '@components/atoms/links/link';
import Image, { type ImageProps } from 'next/image';
import { FC, ReactNode } from 'react';
import styles from './responsive-image.module.scss';

export type ResponsiveImageProps = Omit<
  ImageProps,
  'alt' | 'width' | 'height'
> & {
  /**
   * An alternative text.
   */
  alt: string;
  /**
   * A figure caption.
   */
  caption?: ReactNode;
  /**
   * Set additional classnames to the figure wrapper.
   */
  className?: string;
  /**
   * The image height.
   */
  height: number | string;
  /**
   * A link target.
   */
  target?: LinkProps['href'];
  /**
   * The image width.
   */
  width: number | string;
  /**
   * Wrap the image with borders.
   */
  withBorders?: boolean;
};

/**
 * ResponsiveImage component
 *
 * Render a responsive image wrapped in a figure element.
 */
const ResponsiveImage: FC<ResponsiveImageProps> = ({
  alt,
  caption,
  className = '',
  layout,
  objectFit,
  target,
  withBorders,
  ...props
}) => {
  const bordersModifier = withBorders
    ? 'wrapper--has-borders'
    : 'wrapper--no-borders';
  const linkModifier = target ? 'wrapper--has-link' : 'wrapper--no-link';

  return (
    <figure
      className={`${styles.wrapper} ${styles[bordersModifier]} ${styles[linkModifier]} ${className}`}
    >
      {target ? (
        <Link href={target} className={styles.link}>
          <Image
            alt={alt}
            layout={layout || 'intrinsic'}
            objectFit={objectFit || 'contain'}
            className={styles.img}
            {...props}
          />
          {caption && (
            <figcaption className={styles.caption}>{caption}</figcaption>
          )}
        </Link>
      ) : (
        <>
          <Image
            alt={alt}
            layout={layout || 'intrinsic'}
            objectFit={objectFit || 'contain'}
            className={styles.img}
            {...props}
          />
          {caption && (
            <figcaption className={styles.caption}>{caption}</figcaption>
          )}
        </>
      )}
    </figure>
  );
};

export default ResponsiveImage;
