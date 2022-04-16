import Link, { type LinkProps } from '@components/atoms/links/link';
import Image, { type ImageProps } from 'next/image';
import { FC } from 'react';
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
  caption?: string;
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
  ...props
}) => {
  return (
    <figure className={`${styles.wrapper} ${className}`}>
      {target ? (
        <Link href={target} className={styles.link}>
          <Image
            alt={alt}
            layout={layout || 'intrinsic'}
            objectFit={objectFit || 'contain'}
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
