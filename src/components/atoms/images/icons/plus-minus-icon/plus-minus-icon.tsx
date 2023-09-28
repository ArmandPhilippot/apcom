import type { FC, HTMLAttributes } from 'react';
import styles from './plus-minus-icon.module.scss';

export type PlusMinusIconShape = 'minus' | 'plus';

export type PlusMinusIconProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  /**
   * Which shape should be displayed.
   */
  shape: PlusMinusIconShape;
};

/**
 * PlusMinusIcon component
 *
 * Render a plus or a minus icon.
 */
export const PlusMinusIcon: FC<PlusMinusIconProps> = ({
  className = '',
  shape,
  ...props
}) => {
  const shapeClass = styles[`icon--${shape}`];
  const iconClass = `${styles.icon} ${shapeClass} ${className}`;

  return <div {...props} className={iconClass} />;
};
