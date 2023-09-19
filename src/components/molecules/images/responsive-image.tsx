import Image, { type ImageProps } from 'next/image';
import { FC, ReactNode } from 'react';
import Link, { type LinkProps } from '../../atoms/links/link';
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
  height: number | `${number}`;
  /**
   * A link target.
   */
  target?: LinkProps['href'];
  /**
   * The image width.
   */
  width: number | `${number}`;
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
  target,
  title,
  withBorders,
  ...props
}) => {
  const bordersModifier = withBorders ? styles['wrapper--has-borders'] : '';
  const linkModifier = target
    ? styles['wrapper--has-link']
    : styles['wrapper--no-link'];

  return (
    <figure
      aria-label={caption ? undefined : title}
      className={`${styles.wrapper} ${bordersModifier} ${linkModifier} ${className}`}
    >
      {target ? (
        <Link href={target} className={styles.link}>
          <Image
            alt={alt}
            className={styles.img}
            sizes="100vw"
            title={title}
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
            className={styles.img}
            sizes="100vw"
            title={title}
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
