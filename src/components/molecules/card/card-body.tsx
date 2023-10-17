import type { FC, HTMLAttributes } from 'react';
import styles from './card.module.scss';

export type CardBodyProps = HTMLAttributes<HTMLElement>;

export const CardBody: FC<CardBodyProps> = ({
  children,
  className = '',
  ...props
}) => {
  const bodyClass = `${styles.body} ${className}`;

  return (
    <div {...props} className={bodyClass}>
      {children}
    </div>
  );
};
