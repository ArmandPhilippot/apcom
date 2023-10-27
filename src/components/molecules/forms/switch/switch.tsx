import {
  type FC,
  type ChangeEventHandler,
  type ReactNode,
  type ReactElement,
  forwardRef,
  type ForwardRefRenderFunction,
} from 'react';
import {
  Fieldset,
  type FieldsetProps,
  type LabelProps,
  type RadioProps,
  Label,
  Radio,
} from '../../../atoms';
import type { TooltipProps } from '../../tooltip';
import styles from './switch.module.scss';

type SwitchItemProps = Omit<LabelProps, 'children' | 'htmlFor' | 'isRequired'> &
  Pick<RadioProps, 'isDisabled' | 'name'> & {
    /**
     * The item id.
     */
    id: string;
    /**
     * Is the item selected?
     */
    isSelected?: boolean;
    /**
     * The label used to describe the switch item.
     */
    label: ReactNode;
    /**
     * The event handler on value change.
     */
    onSwitch: ChangeEventHandler<HTMLInputElement>;
    /**
     * The item value.
     */
    value: string;
  };

/**
 * SwitchItem component.
 */
const SwitchItem: FC<SwitchItemProps> = ({
  className = '',
  id,
  isDisabled = false,
  isSelected = false,
  label,
  name,
  onSwitch,
  value,
  ...props
}) => {
  const itemClass = `${styles.item} ${className}`;

  return (
    <Label {...props} className={itemClass} htmlFor={id}>
      <Radio
        className={styles.radio}
        id={id}
        isChecked={isSelected}
        isDisabled={isDisabled}
        isHidden
        name={name}
        onChange={onSwitch}
        value={value}
      />
      <span className={styles.label}>{label}</span>
    </Label>
  );
};

export type SwitchOption = Pick<SwitchItemProps, 'id' | 'label' | 'value'>;

export type SwitchProps = Omit<FieldsetProps, 'children'> & {
  /**
   * The switch items.
   */
  items: [SwitchOption, SwitchOption];
  /**
   * The switch group name.
   */
  name: string;
  /**
   * A function to handle selection change.
   */
  onSwitch: ChangeEventHandler<HTMLInputElement>;
  /**
   * A tooltip to display before switch options.
   */
  tooltip?: ReactElement<TooltipProps>;
  /**
   * The selected item value.
   */
  value: SwitchOption['value'];
};

const SwitchWithRef: ForwardRefRenderFunction<
  HTMLFieldSetElement,
  SwitchProps
> = (
  {
    className = '',
    isDisabled = false,
    items,
    name,
    onSwitch,
    tooltip,
    value,
    ...props
  },
  ref
) => {
  const fieldsetClass = `${styles.fieldset} ${className}`;

  return (
    <Fieldset
      {...props}
      className={fieldsetClass}
      isDisabled={isDisabled}
      ref={ref}
      // eslint-disable-next-line react/jsx-no-literals -- Role allowed
      role="radiogroup"
    >
      {tooltip}
      <div className={styles.switch}>
        {items.map((item) => (
          <SwitchItem
            {...item}
            isDisabled={isDisabled}
            isSelected={value === item.value}
            key={item.id}
            name={name}
            onSwitch={onSwitch}
          />
        ))}
      </div>
    </Fieldset>
  );
};

/**
 * Switch component.
 */
export const Switch = forwardRef(SwitchWithRef);
