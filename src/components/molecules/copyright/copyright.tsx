import type { FC, HTMLAttributes } from 'react';
import { Time } from '../../atoms';
import styles from './copyright.module.scss';

export type CopyrightProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children'
> & {
  /**
   * The start year of the copyright.
   */
  from: string;
  /**
   * The end year of the copyright.
   */
  to?: string;
  /**
   * The copyright owner.
   */
  owner: string;
};

export const Copyright: FC<CopyrightProps> = ({
  className = '',
  from,
  owner,
  to,
  ...props
}) => {
  const wrapperClass = `${styles.wrapper} ${className}`;

  /* eslint-disable react/jsx-no-literals -- Symbols allowed */
  return (
    <span {...props} className={wrapperClass}>
      &copy;
      <Time date={from} hideDay hideMonth />
      {to ? (
        <>
          {'-'}
          <Time date={to} hideDay hideMonth />
        </>
      ) : null}{' '}
      {owner}
      {'.'}
    </span>
  );
  /* eslint-enable react/jsx-no-literals */
};
