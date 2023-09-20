import { FC } from 'react';
import { Label, type LabelProps, Select, type SelectProps } from '../../atoms';
import styles from './labelled-select.module.scss';

export type LabelledSelectProps = Omit<
  SelectProps,
  'aria-labelledby' | 'className'
> & {
  /**
   * The field label.
   */
  label: string;
  /**
   * Set additional classnames to the label.
   */
  labelClassName?: LabelProps['className'];
  /**
   * The label position. Default: top.
   */
  labelPosition?: 'left' | 'top';
  /**
   * The label size.
   */
  labelSize?: LabelProps['size'];
  /**
   * Set additional classnames to the select field.
   */
  selectClassName?: SelectProps['className'];
};

/**
 * LabelledSelect component
 *
 * Render a select with a label.
 */
export const LabelledSelect: FC<LabelledSelectProps> = ({
  id,
  label,
  labelClassName = '',
  labelPosition = 'top',
  labelSize,
  required,
  selectClassName = '',
  ...props
}) => {
  const positionModifier = `label--${labelPosition}`;

  return (
    <>
      <Label
        className={`${styles[positionModifier]} ${labelClassName}`}
        htmlFor={id}
        required={required}
        size={labelSize}
      >
        {label}
      </Label>
      <Select
        {...props}
        className={selectClassName}
        id={id}
        required={required}
      />
    </>
  );
};
