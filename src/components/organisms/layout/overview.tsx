import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import type { FC } from 'react';
import { Figure } from '../../atoms';
import { MetaList, type MetaItemData } from '../../molecules';
import styles from './overview.module.scss';

export type OverviewProps = {
  /**
   * Set additional classnames to the overview wrapper.
   */
  className?: string;
  /**
   * The overview cover.
   */
  cover?: Pick<NextImageProps, 'alt' | 'src' | 'width' | 'height'>;
  /**
   * The overview meta.
   */
  meta: MetaItemData[];
};

/**
 * Overview component
 *
 * Render an overview.
 */
export const Overview: FC<OverviewProps> = ({
  className = '',
  cover,
  meta,
}) => {
  const wrapperClass = `${styles.wrapper} ${className}`;

  return (
    <div className={wrapperClass}>
      {cover ? (
        <Figure>
          <NextImage {...cover} className={styles.cover} />
        </Figure>
      ) : null}
      <MetaList className={styles.meta} hasInlinedValues items={meta} />
    </div>
  );
};
