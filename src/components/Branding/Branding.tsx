import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import { t } from '@lingui/macro';
import photo from '@assets/images/armand-philippot.jpg';
import { config } from '@config/website';
import styles from './Branding.module.scss';

type BrandingReturn = ({ isHome }: { isHome?: boolean }) => ReactElement;

const Branding: BrandingReturn = ({ isHome = false }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Image
          src={photo}
          alt={t({
            message: `${config.name} picture`,
            comment: 'Branding logo.',
          })}
          layout="intrinsic"
        />
      </div>
      {isHome ? (
        <h1 className={styles.name}>
          <Link href="/">
            <a>{config.name}</a>
          </Link>
        </h1>
      ) : (
        <p className={styles.name}>
          <Link href="/">
            <a>{config.name}</a>
          </Link>
        </p>
      )}
      <p className={styles.job}>{config.baseline}</p>
    </div>
  );
};

export default Branding;
