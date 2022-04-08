import Logo from '@components/atoms/images/logo';
import Image from 'next/image';
import { VFC } from 'react';
import styles from './flipping-logo.module.scss';

type FlippingLogoProps = {
  /**
   * Set additional classnames to the logo wrapper.
   */
  className?: string;
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
const FlippingLogo: VFC<FlippingLogoProps> = ({
  className = '',
  altText,
  logoTitle,
  photo,
}) => {
  return (
    <div className={`${styles.logo} ${className}`}>
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
