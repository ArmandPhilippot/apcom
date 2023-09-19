import dynamic from 'next/dynamic';
import { FC, ReactNode } from 'react';
import Heading, { type HeadingProps } from '../../atoms/headings/heading';
import { type CogProps } from '../../atoms/icons/cog';
import { type MagnifyingGlassProps } from '../../atoms/icons/magnifying-glass';
import styles from './modal.module.scss';

export type Icons = 'cogs' | 'search';

export type ModalProps = {
  /**
   * The modal body.
   */
  children: ReactNode;
  /**
   * Set additional classnames.
   */
  className?: string;
  /**
   * Set additional classnames to the heading.
   */
  headingClassName?: HeadingProps['className'];
  /**
   * A icon to illustrate the modal.
   */
  icon?: Icons;
  /**
   * The modal title.
   */
  title?: string;
};

const CogIcon = dynamic<CogProps>(() => import('../../atoms/icons/cog'), {
  ssr: false,
});
const SearchIcon = dynamic<MagnifyingGlassProps>(
  () => import('../../atoms/icons/magnifying-glass'),
  { ssr: false }
);

/**
 * Modal component
 *
 * Render a modal component with an optional title and icon.
 */
const Modal: FC<ModalProps> = ({
  children,
  className = '',
  headingClassName = '',
  icon,
  title,
}) => {
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
        <Heading
          isFake={true}
          level={3}
          className={`${styles.title} ${headingClassName}`}
        >
          {icon && <span className={styles.icon}>{getIcon(icon)}</span>}
          {title}
        </Heading>
      )}
      {children}
    </div>
  );
};

export default Modal;
