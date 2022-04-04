import Logo from '@components/atoms/images/logo';
import Image from 'next/image';
import { FC } from 'react';
import styles from './flipping-logo.module.scss';

type FlippingLogoProps = {
  /**
   * Adds additional classes to the logo wrapper.
   */
  additionalClasses?: string;
  /**
   * Photo alternative text.
   */
  altText: string;
  /**
   * Logo image title.
   */
  logoTitle?: string;
  /**
   * Photo url.
   */
  photo: string;
};

/**
 * FlippingLogo component
 *
 * Render a logo and a photo with a flipping effect.
 */
const FlippingLogo: FC<FlippingLogoProps> = ({
  additionalClasses,
  altText,
  logoTitle,
  photo,
}) => {
  return (
    <div className={`${styles.logo} ${additionalClasses}`}>
      <div className={styles.logo__front}>
        <Image src={photo} alt={altText} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.logo__back}>
        <Logo title={logoTitle} />
      </div>
    </div>
  );
};

export default FlippingLogo;
