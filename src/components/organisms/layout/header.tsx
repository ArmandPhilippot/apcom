import Branding, {
  type BrandingProps,
} from '@components/molecules/layout/branding';
import { FC } from 'react';
import Toolbar, { type ToolbarProps } from '../toolbar/toolbar';
import styles from './header.module.scss';

export type HeaderProps = BrandingProps &
  Pick<ToolbarProps, 'nav' | 'searchPage'> & {
    /**
     * Set additional classnames to the header element.
     */
    className?: string;
  };

/**
 * Header component
 *
 * Render the website header.
 */
const Header: FC<HeaderProps> = ({ className, nav, searchPage, ...props }) => {
  return (
    <header className={`${styles.wrapper} ${className}`}>
      <div className={styles.body}>
        <Branding {...props} />
        <Toolbar nav={nav} searchPage={searchPage} className={styles.toolbar} />
      </div>
    </header>
  );
};

export default Header;
