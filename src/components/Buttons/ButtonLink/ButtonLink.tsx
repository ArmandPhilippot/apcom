import { ButtonPosition } from '@ts/types/app';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from '../Buttons.module.scss';

const ButtonLink = ({
  children,
  target,
  position = 'left',
  isExternal = false,
  hasIcon = false,
}: {
  children: ReactNode;
  target: string;
  position?: ButtonPosition;
  isExternal?: boolean;
  hasIcon?: boolean;
}) => {
  const classes = `${styles.btn} ${styles.link} ${styles[`link--${position}`]}${
    hasIcon ? ` ${styles['link--icon']}` : ''
  }`;

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
