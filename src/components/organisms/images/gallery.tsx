import { Children, type FC, type ReactElement } from 'react';
import { List, ListItem } from '../../atoms';
import styles from './gallery.module.scss';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export type GalleryColumn = 2 | 3 | 4;

export type GalleryProps = {
  /**
   * The images.
   */
  children: ReactElement[];
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
export const Gallery: FC<GalleryProps> = ({ children, columns }) => {
  const columnsClass = `wrapper--${columns}-columns`;

  return (
    <List className={`${styles.wrapper} ${styles[columnsClass]}`} hideMarker>
      {Children.map(children, (child) => (
        <ListItem className={styles.item}>{child}</ListItem>
      ))}
    </List>
  );
};
