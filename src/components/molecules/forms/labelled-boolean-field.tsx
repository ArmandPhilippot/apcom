import { FC } from 'react';
import {
  BooleanField,
  type BooleanFieldProps,
  Label,
  type LabelProps,
} from '../../atoms';
import styles from './labelled-boolean-field.module.scss';

export type LabelledBooleanFieldProps = Omit<
  BooleanFieldProps,
  'aria-labelledby' | 'className'
> & {
  /**
   * Set additional classnames to the labelled field wrapper.
   */
  className?: string;
  /**
   * Set additional classnames to the field.
   */
  fieldClassName?: LabelledBooleanFieldProps['className'];
  /**
   * The field label.
   */
  label: LabelProps['children'];
  /**
   * Set additional classnames to the label.
   */
  labelClassName?: LabelProps['className'];
  /**
   * The label position. Default: left.
   */
  labelPosition?: 'left' | 'right';
  /**
   * The label size.
   */
  labelSize?: LabelProps['size'];
};

/**
 * LabelledBooleanField component
 *
 * Render a checkbox or radio button with a label.
 */
export const LabelledBooleanField: FC<LabelledBooleanFieldProps> = ({
  className = '',
  fieldClassName,
  hidden,
  id,
  label,
  labelClassName,
  labelPosition = 'left',
  labelSize,
  ...props
}) => {
  const labelHiddenModifier = hidden ? 'label--hidden' : 'label--visible';
  const labelPositionModifier = `label--${labelPosition}`;
  const labelClass = `${styles[labelPositionModifier]} ${styles[labelHiddenModifier]} ${labelClassName}`;

  return labelPosition === 'left' ? (
    <span className={`${styles.wrapper} ${className}`}>
      <Label className={labelClass} htmlFor={id} size={labelSize}>
        {label}
      </Label>
      <BooleanField
        {...props}
        className={fieldClassName}
        hidden={hidden}
        id={id}
      />
    </span>
  ) : (
    <span className={`${styles.wrapper} ${className}`}>
      <BooleanField
        {...props}
        className={fieldClassName}
        hidden={hidden}
        id={id}
      />
      <Label className={labelClass} htmlFor={id} size={labelSize}>
        {label}
      </Label>
    </span>
  );
};
