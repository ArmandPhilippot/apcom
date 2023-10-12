import type { FC, ReactNode } from 'react';
import styles from './copyright.module.scss';
import { Time } from './time';

export type CopyrightDates = {
  /**
   * The copyright start year.
   */
  start: string;
  /**
   * The copyright end year.
   */
  end?: string;
};

export type CopyrightProps = {
  /**
   * The copyright owner.
   */
  owner: string;
  /**
   * The copyright dates.
   */
  dates: CopyrightDates;
  /**
   * The copyright icon.
   */
  icon: ReactNode;
};

/**
 * Copyright component
 *
 * Renders a copyright information (owner, dates, license icon).
 */
export const Copyright: FC<CopyrightProps> = ({ owner, dates, icon }) => (
  <div className={styles.wrapper}>
    <span className={styles.owner}>{owner}</span>
    {icon}
    <Time date={dates.start} hideDay hideMonth />
    {dates.end ? (
      <>
        <span>-</span>
        <Time date={dates.end} hideDay hideMonth />
      </>
    ) : (
      ''
    )}
  </div>
);
