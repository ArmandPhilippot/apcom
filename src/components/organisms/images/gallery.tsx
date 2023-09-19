import { Children, FC, ReactElement } from 'react';
import { type ResponsiveImageProps } from '../../molecules/images/responsive-image';
import styles from './gallery.module.scss';

export type GalleryColumn = 2 | 3 | 4;

export type GalleryProps = {
  /**
   * The images using ResponsiveImage component.
   */
  children: ReactElement<ResponsiveImageProps>[];
  /**
   * The columns count.
   */
  columns: GalleryColumn;
};

/**
 * Gallery component
 *
 * Render a gallery of images.
 */
const Gallery: FC<GalleryProps> = ({ children, columns }) => {
  const columnsClass = `wrapper--${columns}-columns`;

  return (
    <ul className={`${styles.wrapper} ${styles[columnsClass]}`}>
      {Children.map(children, (child) => {
        return <li className={styles.item}>{child}</li>;
      })}
    </ul>
  );
};

export default Gallery;
