import Logo, { type LogoProps } from '@components/atoms/images/logo';
import Image, { type ImageProps } from 'next/image';
import { FC } from 'react';
import styles from './flipping-logo.module.scss';

export type FlippingLogoProps = {
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
  logoTitle?: LogoProps['title'];
  /**
   * Photo url.
   */
  photo: ImageProps['src'];
};

/**
 * FlippingLogo component
 *
 * Render a logo and a photo with a flipping effect.
 */
const FlippingLogo: FC<FlippingLogoProps> = ({
  className = '',
  altText,
  logoTitle,
  photo,
  ...props
}) => {
  return (
    <div className={`${styles.logo} ${className}`}>
      <div className={styles.logo__front}>
        <Image
          src={photo}
          alt={altText}
          layout="fill"
          objectFit="cover"
          {...props}
        />
      </div>
      <div className={styles.logo__back}>
        <Logo title={logoTitle} />
      </div>
    </div>
  );
};

export default FlippingLogo;
