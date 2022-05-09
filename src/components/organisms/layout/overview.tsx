import ResponsiveImage, {
  type ResponsiveImageProps,
} from '@components/molecules/images/responsive-image';
import Meta, { type MetaData } from '@components/molecules/layout/meta';
import { FC } from 'react';
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
const Overview: FC<OverviewProps> = ({ className = '', cover, meta }) => {
  const { technologies, ...remainingMeta } = meta;
  const metaModifier = technologies ? styles['meta--has-techno'] : '';

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {cover && (
        <ResponsiveImage
          layout="responsive"
          objectFit="contain"
          className={styles.cover}
          {...cover}
        />
      )}
      <Meta
        data={{ ...remainingMeta, technologies }}
        layout="inline"
        className={`${styles.meta} ${metaModifier}`}
        withSeparator={false}
      />
    </div>
  );
};

export default Overview;
