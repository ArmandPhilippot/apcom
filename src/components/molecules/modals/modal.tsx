import Heading from '@components/atoms/headings/heading';
import { CogProps } from '@components/atoms/icons/cog';
import { MagnifyingGlassProps } from '@components/atoms/icons/magnifying-glass';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import styles from './modal.module.scss';

export type Icons = 'cogs' | 'search';

export type ModalProps = {
  /**
   * Set additional classnames.
   */
  className?: string;
  /**
   * A icon to illustrate the modal.
   */
  icon?: Icons;
  /**
   * The modal title.
   */
  title?: string;
};

const CogIcon = dynamic<CogProps>(() => import('@components/atoms/icons/cog'));
const SearchIcon = dynamic<MagnifyingGlassProps>(
  () => import('@components/atoms/icons/magnifying-glass')
);

/**
 * Modal component
 *
 * Render a modal component with an optional title and icon.
 */
const Modal: FC<ModalProps> = ({ children, className = '', icon, title }) => {
  const getIcon = (id: Icons) => {
    switch (id) {
      case 'cogs':
        return <CogIcon />;
      case 'search':
        return <SearchIcon />;
      default:
        return <></>;
    }
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {title && (
        <Heading isFake={true} level={3}>
          {icon && <span className={styles.icon}>{getIcon(icon)}</span>}
          {title}
        </Heading>
      )}
      {children}
    </div>
  );
};

export default Modal;
