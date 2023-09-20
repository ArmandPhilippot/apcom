import Image, { type ImageProps } from 'next/image';
import { ForwardedRef, forwardRef, ForwardRefRenderFunction } from 'react';
import { Logo, type LogoProps } from '../../atoms';
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

const FlippingLogoWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  FlippingLogoProps
> = (
  { className = '', altText, logoTitle, photo, ...props },
  ref: ForwardedRef<HTMLDivElement>
) => {
  return (
    <div className={`${styles.logo} ${className}`} ref={ref}>
      <div className={styles.logo__front}>
        <Image
          {...props}
          alt={altText}
          height="100"
          src={photo}
          style={{ objectFit: 'cover' }}
          width="100"
        />
      </div>
      <div className={styles.logo__back}>
        <Logo title={logoTitle} />
      </div>
    </div>
  );
};

/**
 * FlippingLogo component
 *
 * Render a logo and a photo with a flipping effect.
 */
export const FlippingLogo = forwardRef(FlippingLogoWithRef);
