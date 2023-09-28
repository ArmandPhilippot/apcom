import NextImage, { type ImageProps } from 'next/image';
import {
  type ForwardedRef,
  forwardRef,
  type ForwardRefRenderFunction,
} from 'react';
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
  logoTitle?: LogoProps['heading'];
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
  const wrapperClass = `${styles.logo} ${className}`;
  const size = 100;

  return (
    <div className={wrapperClass} ref={ref}>
      <div className={styles.logo__front}>
        <NextImage
          {...props}
          alt={altText}
          height={size}
          src={photo}
          style={{ objectFit: 'cover' }}
          width={size}
        />
      </div>
      <div className={styles.logo__back}>
        <Logo heading={logoTitle} />
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
