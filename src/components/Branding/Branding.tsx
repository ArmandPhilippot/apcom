import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import { t } from '@lingui/macro';
import photo from '@assets/images/armand-philippot.jpg';
import Logo from '@assets/images/armand-philippot-logo.svg';
import { config } from '@config/website';
import styles from './Branding.module.scss';

type BrandingReturn = ({ isHome }: { isHome: boolean }) => ReactElement;

const Branding: BrandingReturn = ({ isHome = false }) => {
  const TitleTag = isHome ? 'h1' : 'p';

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <div className={styles.logo__front}>
          <Image
            src={photo}
            alt={t({
              message: `${config.name} picture`,
              comment: 'Branding logo.',
            })}
            layout="intrinsic"
          />
        </div>
        <div className={styles.logo__back}>
          <Logo />
        </div>
      </div>
      <TitleTag className={styles.name}>
        <Link href="/">
          <a className={styles.link}>{config.name}</a>
        </Link>
      </TitleTag>
      <p className={styles.job}>{config.baseline}</p>
    </div>
  );
};

export default Branding;
