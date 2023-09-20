import { FC } from 'react';
import {
  Meta,
  type MetaData,
  ResponsiveImage,
  type ResponsiveImageProps,
} from '../../molecules';
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
  cover?: Pick<ResponsiveImageProps, 'alt' | 'src' | 'width' | 'height'>;
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
      {cover && <ResponsiveImage className={styles.cover} {...cover} />}
      <Meta
        className={`${styles.meta} ${metaModifier}`}
        data={{ ...remainingMeta, technologies }}
        layout="inline"
        withSeparator={false}
      />
    </div>
  );
};
