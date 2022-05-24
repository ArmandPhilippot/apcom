import { FC } from 'react';
import styles from './no-script.module.scss';

export type NoScriptProps = {
  /**
   * The noscript message.
   */
  message: string;
  /**
   * The message position. Default: initial.
   */
  position?: 'initial' | 'top';
};

const NoScript: FC<NoScriptProps> = ({ message, position = 'initial' }) => {
  const positionClass = styles[`noscript--${position}`];

  return <div className={`${styles.noscript} ${positionClass}`}>{message}</div>;
};

export default NoScript;
