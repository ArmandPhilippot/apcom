import { Children, ReactElement } from 'react';
import styles from './Gallery.module.scss';

const Gallery = ({
  children,
  columns = 2,
}: {
  children: ReactElement;
  columns: number;
}) => {
  const columnClass = styles[`wrapper--${columns}-columns`];

  return (
    <ul className={`${styles.wrapper} ${columnClass}`}>
      {Children.map(children, (child) => {
        return <li className={styles.item}>{child}</li>;
      })}
    </ul>
  );
};

export default Gallery;
