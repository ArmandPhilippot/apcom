import {
  type HTMLAttributes,
  type ForwardRefRenderFunction,
  forwardRef,
  type ReactElement,
} from 'react';
import styles from './branding.module.scss';
import { Link } from 'src/components/atoms';

export type BrandingProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /**
   * The brand baseline.
   */
  baseline?: ReactElement | null;
  /**
   * The brand logo.
   *
   * The logo size should not exceed ~200px.
   */
  logo: ReactElement;
  /**
   * The brand name.
   */
  name: ReactElement;
  /**
   * The homepage url if you want to wrap the name with a link.
   */
  url?: string;
};

const BrandingWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  BrandingProps
> = ({ className = '', baseline, logo, name, url, ...props }, ref) => {
  const wrapperClass = `${styles.wrapper} ${className}`;

  return (
    <div {...props} className={wrapperClass} ref={ref}>
      {logo}
      {url ? (
        <Link className={styles.link} href={url}>
          {name}
        </Link>
      ) : (
        name
      )}
      {baseline}
    </div>
  );
};

/**
 * Branding component
 *
 * Render the branding logo, title and optional baseline.
 */
export const Branding = forwardRef(BrandingWithRef);
