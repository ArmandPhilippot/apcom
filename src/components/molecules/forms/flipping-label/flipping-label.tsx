import type { FC, ReactNode } from 'react';
import {
  Icon,
  Label,
  VisuallyHidden,
  type LabelProps,
  Flip,
  FlipSide,
} from '../../../atoms';
import styles from './flipping-label.module.scss';

export type FlippingLabelProps = Omit<
  LabelProps,
  'children' | 'isHidden' | 'isRequired'
> & {
  /**
   * The front icon.
   */
  icon: ReactNode;
  /**
   * Which side of the label should be displayed? True for the close icon.
   */
  isActive: boolean;
  /**
   * An accessible name for the label.
   */
  label: string;
};

export const FlippingLabel: FC<FlippingLabelProps> = ({
  className = '',
  icon,
  isActive,
  label,
  ...props
}) => {
  const wrapperClass = `${styles.wrapper} ${className}`;

  return (
    <Label {...props} className={wrapperClass}>
      <VisuallyHidden>{label}</VisuallyHidden>
      <Flip
        aria-hidden
        // eslint-disable-next-line react/jsx-no-literals -- Shape allowed
        showBack={isActive}
      >
        <FlipSide className={styles.front}>{icon}</FlipSide>
        <FlipSide className={styles.back} isBack>
          <Icon aria-hidden shape="cross" />
        </FlipSide>
      </Flip>
    </Label>
  );
};
