import { ButtonPosition } from '@ts/types/app';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from '../Buttons.module.scss';

const ButtonLink = ({
  children,
  target,
  position = 'left',
  isExternal = false,
}: {
  children: ReactNode;
  target: string;
  position?: ButtonPosition;
  isExternal?: boolean;
}) => {
  const classes = `${styles.btn} ${styles[position]} ${styles.tertiary}`;

  return isExternal ? (
    <a className={classes} href={target}>
      {children}
    </a>
  ) : (
    <Link href={target}>
      <a className={classes}>{children}</a>
    </Link>
  );
};

export default ButtonLink;
