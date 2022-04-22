import Branding, {
  type BrandingProps,
} from '@components/molecules/layout/branding';
import { FC } from 'react';
import Toolbar, { type ToolbarProps } from '../toolbar/toolbar';
import styles from './header.module.scss';

export type HeaderProps = BrandingProps & {
  /**
   * Set additional classnames to the header element.
   */
  className?: string;
  /**
   * The main nav items.
   */
  nav: ToolbarProps['nav'];
};

/**
 * Header component
 *
 * Render the website header.
 */
const Header: FC<HeaderProps> = ({ className, nav, ...props }) => {
  return (
    <header className={`${styles.wrapper} ${className}`}>
      <div className={styles.body}>
        <Branding {...props} />
        <Toolbar nav={nav} className={styles.toolbar} />
      </div>
    </header>
  );
};

export default Header;
