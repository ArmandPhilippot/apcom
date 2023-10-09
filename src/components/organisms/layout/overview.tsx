import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import type { FC } from 'react';
import { Figure } from '../../atoms';
import { Meta, type MetaData } from '../../molecules';
import styles from './overview.module.scss';

export type OverviewMeta = Pick<
  MetaData,
  | 'creation'
  | 'license'
  | 'popularity'
  | 'repositories'
  | 'technologies'
  | 'update'
>;

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
  meta: OverviewMeta;
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
  const { technologies, ...remainingMeta } = meta;
  const metaModifier = technologies ? styles['meta--has-techno'] : '';

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {cover ? (
        <Figure>
          <NextImage {...cover} className={styles.cover} />
        </Figure>
      ) : null}
      <Meta
        className={`${styles.meta} ${metaModifier}`}
        data={{ ...remainingMeta, technologies }}
      />
    </div>
  );
};
