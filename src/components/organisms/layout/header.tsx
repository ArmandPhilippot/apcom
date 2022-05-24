import Branding, {
  type BrandingProps,
} from '@components/molecules/layout/branding';
import { FC } from 'react';
import Toolbar, { type ToolbarProps } from '../toolbar/toolbar';
import styles from './header.module.scss';

export type HeaderProps = BrandingProps &
  Pick<
    ToolbarProps,
    'ackeeStorageKey' | 'motionStorageKey' | 'nav' | 'searchPage'
  > & {
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
const Header: FC<HeaderProps> = ({
  ackeeStorageKey,
  className,
  motionStorageKey,
  nav,
  searchPage,
  ...props
}) => {
  return (
    <header className={`${styles.wrapper} ${className}`}>
      <div className={styles.body}>
        <Branding {...props} />
        <Toolbar
          ackeeStorageKey={ackeeStorageKey}
          className={styles.toolbar}
          motionStorageKey={motionStorageKey}
          nav={nav}
          searchPage={searchPage}
        />
      </div>
    </header>
  );
};

export default Header;
