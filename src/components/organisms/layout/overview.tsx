import ResponsiveImage, {
  type ResponsiveImageProps,
} from '@components/molecules/images/responsive-image';
import Meta, { type MetaMap } from '@components/molecules/layout/meta';
import { VFC } from 'react';
import styles from './overview.module.scss';

export type OverviewProps = {
  cover?: Pick<ResponsiveImageProps, 'alt' | 'src' | 'width' | 'height'>;
  meta: MetaMap;
};

/**
 * Overview component
 *
 * Render an overview.
 */
const Overview: VFC<OverviewProps> = ({ cover, meta }) => {
  return (
    <div className={styles.wrapper}>
      {cover && (
        <ResponsiveImage
          objectFit="cover"
          className={styles.cover}
          {...cover}
        />
      )}
      <Meta data={meta} layout="column" responsiveLayout={true} />
    </div>
  );
};

export default Overview;
