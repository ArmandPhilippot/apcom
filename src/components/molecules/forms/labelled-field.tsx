import Field, { type FieldProps } from '@components/atoms/forms/field';
import Label from '@components/atoms/forms/label';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import styles from './labelled-field.module.scss';

export type LabelledFieldProps = FieldProps & {
  /**
   * Visually hide the field label. Default: false.
   */
  hideLabel?: boolean;
  /**
   * The field label.
   */
  label: string;
  /**
   * The label position. Default: top.
   */
  labelPosition?: 'left' | 'top';
};

/**
 * LabelledField component
 *
 * Render a field tied to a label.
 */
const LabelledField: ForwardRefRenderFunction<
  HTMLInputElement,
  LabelledFieldProps
> = (
  { hideLabel = false, id, label, labelPosition = 'top', required, ...props },
  ref
) => {
  const positionModifier = `label--${labelPosition}`;
  const visibilityClass = hideLabel ? 'screen-reader-text' : '';

  return (
    <>
      <Label
        htmlFor={id}
        required={required}
        className={`${visibilityClass} ${styles[positionModifier]}`}
      >
        {label}
      </Label>
      <Field id={id} ref={ref} required={required} {...props} />
    </>
  );
};

export default forwardRef(LabelledField);
