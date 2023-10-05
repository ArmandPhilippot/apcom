import {
  forwardRef,
  type HTMLAttributes,
  type ReactElement,
  type ForwardRefRenderFunction,
} from 'react';
import type {
  CheckboxProps,
  InputProps,
  LabelProps,
  RadioProps,
  SelectProps,
  TextAreaProps,
} from '../../../atoms';
import styles from './labelled-field.module.scss';

export type LabelledFieldProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  /**
   * The field.
   */
  field: ReactElement<
    CheckboxProps | InputProps | RadioProps | SelectProps | TextAreaProps
  >;
  /**
   * Should the label and the field be inlined?
   *
   * @default false
   */
  isInline?: boolean;
  /**
   * If true, the label is displayed after the field.
   *
   * @default false
   */
  isReversedOrder?: boolean;
  /**
   * The field label.
   */
  label: ReactElement<LabelProps>;
};

const LabelledFieldWithRef: ForwardRefRenderFunction<
  HTMLDivElement,
  LabelledFieldProps
> = (
  {
    className = '',
    field,
    isInline = false,
    isReversedOrder = false,
    label,
    ...props
  },
  ref
) => {
  const layoutClass = isInline ? 'wrapper--inline' : 'wrapper--stack';
  const orderClass = isReversedOrder ? 'wrapper--reverse' : '';
  const wrapperClass = `${styles.wrapper} ${styles[layoutClass]} ${styles[orderClass]} ${className}`;

  return (
    <div {...props} className={wrapperClass} ref={ref}>
      {label}
      {field}
    </div>
  );
};

/**
 * LabelledField component
 *
 * Render a field tied to a label.
 */
export const LabelledField = forwardRef(LabelledFieldWithRef);
