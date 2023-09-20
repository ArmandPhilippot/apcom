import { FC, ReactNode } from 'react';
import styles from './copyright.module.scss';

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
export const Copyright: FC<CopyrightProps> = ({ owner, dates, icon }) => {
  const getFormattedDate = (date: string) => {
    const datetime = new Date(date).toISOString();

    return <time dateTime={datetime}>{date}</time>;
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.owner}>{owner}</span>
      {icon}
      {getFormattedDate(dates.start)}
      {dates.end ? (
        <>
          <span>-</span>
          {getFormattedDate(dates.end)}
        </>
      ) : (
        ''
      )}
    </div>
  );
};
