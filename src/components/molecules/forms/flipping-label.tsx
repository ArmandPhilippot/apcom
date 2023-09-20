import { FC } from 'react';
import { Close, Label, type LabelProps } from '../../atoms';
import styles from './flipping-label.module.scss';

export type FlippingLabelProps = Pick<
  LabelProps,
  'aria-label' | 'className' | 'htmlFor'
> & {
  /**
   * The front icon.
   */
  children: JSX.Element;
  /**
   * Which side of the label should be displayed? True for the close icon.
   */
  isActive: boolean;
};

export const FlippingLabel: FC<FlippingLabelProps> = ({
  children,
  className = '',
  isActive,
  ...props
}) => {
  const wrapperModifier = isActive ? 'wrapper--active' : 'wrapper--inactive';

  return (
    <Label {...props} className={`${styles.label} ${className}`}>
      <span className={`${styles.wrapper} ${styles[wrapperModifier]}`}>
        <span className={styles.front}>{children}</span>
        <span className={styles.back}>
          <Close aria-hidden={true} />
        </span>
      </span>
    </Label>
  );
};
