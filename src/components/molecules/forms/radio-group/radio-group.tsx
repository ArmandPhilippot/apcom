import { type ForwardRefRenderFunction, forwardRef } from 'react';
import {
  Fieldset,
  type FieldsetProps,
  Label,
  type LabelProps,
  Radio,
  type RadioProps,
} from '../../../atoms';
import { LabelledField } from '../labelled-field';
import styles from './radio-group.module.scss';

export type RadioGroupItem = {
  /**
   * The item id.
   */
  id: string;
  /**
   * Should the item be disabled?
   */
  isDisabled?: boolean;
  /**
   * The item label.
   */
  label: LabelProps['children'];
  /**
   * The item value.
   */
  value: string;
};

export type RadioGroupProps = Omit<FieldsetProps, 'children' | 'role'> & {
  /**
   * Should we display the radio buttons inlined?
   *
   * @default false
   */
  isInline?: boolean;
  /**
   * The radio group name.
   */
  name: string;
  /**
   * A function to handle selection change.
   */
  onSwitch?: RadioProps['onChange'];
  /**
   * The options.
   */
  options: RadioGroupItem[];
  /**
   * The selected value. It should match a RadioGroupItem value or be undefined.
   */
  value?: RadioGroupItem['value'];
};

const RadioGroupWithRef: ForwardRefRenderFunction<
  HTMLFieldSetElement,
  RadioGroupProps
> = (
  {
    className = '',
    isInline = false,
    name,
    onSwitch,
    options,
    value,
    ...props
  },
  ref
) => {
  const layoutModifier = isInline ? styles['group--inline'] : '';
  const groupClass = `${layoutModifier} ${className}`;

  return (
    <Fieldset
      {...props}
      className={groupClass}
      isInline={isInline}
      ref={ref}
      // eslint-disable-next-line react/jsx-no-literals -- Role allowed
      role="radiogroup"
    >
      {options.map((option) => (
        <LabelledField
          className={styles.option}
          field={
            <Radio
              id={option.id}
              isChecked={value === option.value}
              name={name}
              onChange={onSwitch}
              value={option.value}
            />
          }
          isInline
          isReversedOrder
          key={option.id}
          label={<Label htmlFor={option.id}>{option.label}</Label>}
        />
      ))}
    </Fieldset>
  );
};

/**
 * RadioGroup component
 *
 * Render a group of labelled radio buttons.
 */
export const RadioGroup = forwardRef(RadioGroupWithRef);
