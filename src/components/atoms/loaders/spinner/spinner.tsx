import type { FC, HTMLAttributes, ReactNode } from 'react';
import type { Position } from '../../../../types';
import styles from './spinner.module.scss';

export type SpinnerProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  /**
   * The loading message.
   */
  children?: ReactNode;
  /**
   * Define the position of the loading message if any.
   *
   * @default 'right'
   */
  position?: Exclude<Position, 'center'>;
};

/**
 * Spinner component
 *
 * Render a loading message with animation.
 */
export const Spinner: FC<SpinnerProps> = ({
  children,
  className = '',
  position = 'right',
  ...props
}) => {
  const positionClass = styles[`wrapper--${position}`];
  const wrapperClass = `${styles.wrapper} ${positionClass} ${className}`;

  return (
    <div {...props} className={wrapperClass}>
      <div aria-hidden className={styles.icon}>
        <div className={styles.icon__ball} />
        <div className={styles.icon__ball} />
        <div className={styles.icon__ball} />
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};
