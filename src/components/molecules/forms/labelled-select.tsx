import Label, { LabelProps } from '@components/atoms/forms/label';
import Select, { type SelectProps } from '@components/atoms/forms/select';
import { VFC } from 'react';
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
  labelClassName?: string;
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
  selectClassName?: string;
};

const LabelledSelect: VFC<LabelledSelectProps> = ({
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
        htmlFor={id}
        required={required}
        size={labelSize}
        className={`${styles[positionModifier]} ${labelClassName}`}
      >
        {label}
      </Label>
      <Select
        id={id}
        required={required}
        {...props}
        className={selectClassName}
      />
    </>
  );
};

export default LabelledSelect;
