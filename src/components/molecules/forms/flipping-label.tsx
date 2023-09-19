import { FC } from 'react';
import Label, { LabelProps } from '../../atoms/forms/label';
import Close from '../../atoms/icons/close';
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

const FlippingLabel: FC<FlippingLabelProps> = ({
  children,
  className = '',
  isActive,
  ...props
}) => {
  const wrapperModifier = isActive ? 'wrapper--active' : 'wrapper--inactive';

  return (
    <Label className={`${styles.label} ${className}`} {...props}>
      <span className={`${styles.wrapper} ${styles[wrapperModifier]}`}>
        <span className={styles.front}>{children}</span>
        <span className={styles.back}>
          <Close aria-hidden={true} />
        </span>
      </span>
    </Label>
  );
};

export default FlippingLabel;
