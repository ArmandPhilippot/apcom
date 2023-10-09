import {
  forwardRef,
  type ReactNode,
  type ForwardRefRenderFunction,
} from 'react';
import { Flip, type FlipProps, FlipSide } from '../../../atoms';
import styles from './flipping-logo.module.scss';

type FlippingLogoProps = Omit<FlipProps, 'children'> & {
  /**
   * The back face.
   */
  back: ReactNode;
  /**
   * The front face.
   */
  front: ReactNode;
};

const FlippingLogoWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  FlippingLogoProps
> = ({ back, className = '', front, ...props }, ref) => {
  const wrapperClass = `${styles.wrapper} ${className}`;

  return (
    <Flip {...props} className={wrapperClass} ref={ref}>
      <FlipSide className={styles.side}>{front}</FlipSide>
      <FlipSide className={styles.side} isBack>
        {back}
      </FlipSide>
    </Flip>
  );
};

/**
 * FlippingLogo component
 *
 * Renders a website logo with two faces.
 */
export const FlippingLogo = forwardRef(FlippingLogoWithRef);
