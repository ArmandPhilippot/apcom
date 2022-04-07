import Heading from '@components/atoms/headings/heading';
import dynamic from 'next/dynamic';
import { FC, ReactNode } from 'react';
import styles from './modal.module.scss';

export type Icons = 'cogs' | 'search';

export type ModalProps = {
  icon?: Icons;
  title?: string;
};

const CogIcon = dynamic<ReactNode>(() => import('@components/atoms/icons/cog'));
const SearchIcon = dynamic<ReactNode>(
  () => import('@components/atoms/icons/magnifying-glass')
);

/**
 * Modal component
 *
 * Render a modal component with an optional title and icon.
 */
const Modal: FC<ModalProps> = ({ children, icon, title }) => {
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
    <div className={styles.wrapper}>
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
