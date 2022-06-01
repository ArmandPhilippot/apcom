import Fieldset, {
  type FieldsetProps,
} from '@components/molecules/forms/fieldset';
import useStateChange from '@utils/hooks/use-state-change';
import { ChangeEvent, FC, MouseEvent, SetStateAction, useState } from 'react';
import LabelledBooleanField, {
  type LabelledBooleanFieldProps,
} from './labelled-boolean-field';
import styles from './radio-group.module.scss';

export type RadioGroupCallbackProps = {
  choices: {
    new: string;
    prev: string;
  };
  updateChoice: (value: SetStateAction<string>) => void;
};

export type RadioGroupCallback = (props: RadioGroupCallbackProps) => void;

export type RadioGroupOption = Pick<
  LabelledBooleanFieldProps,
  'id' | 'label' | 'name' | 'value'
>;

export type RadioGroupProps = Pick<
  FieldsetProps,
  'bodyClassName' | 'className' | 'legend' | 'legendClassName' | 'Tooltip'
> &
  Pick<LabelledBooleanFieldProps, 'labelPosition' | 'labelSize'> & {
    /**
     * Set additional classnames to the radio group wrapper when kind is toggle.
     */
    groupClassName?: string;
    /**
     * The default option value.
     */
    initialChoice: string;
    /**
     * The radio group kind. Default: regular.
     */
    kind?: 'regular' | 'toggle';
    /**
     * The legend position. Default: inline.
     */
    legendPosition?: FieldsetProps['legendPosition'];
    /**
     * A callback function to execute when choice is changed.
     */
    onChange?: RadioGroupCallback;
    /**
     * A callback function to execute when clicking on a choice.
     */
    onClick?: RadioGroupCallback;
    /**
     * Set additional classnames to the labelled field wrapper.
     */
    optionClassName?: string;
    /**
     * The options.
     */
    options: RadioGroupOption[];
  };

/**
 * RadioGroup component
 *
 * Render a group of labelled radio buttons.
 */
const RadioGroup: FC<RadioGroupProps> = ({
  className,
  groupClassName = '',
  initialChoice,
  kind = 'regular',
  labelPosition,
  labelSize,
  legendPosition = 'inline',
  onChange,
  optionClassName = '',
  options,
  ...props
}) => {
  const [selectedChoice, setSelectedChoice] =
    useStateChange<string>(initialChoice);
  const isToggle = kind === 'toggle';
  const alignmentModifier = `wrapper--${legendPosition}`;
  const toggleModifier = isToggle ? 'wrapper--toggle' : 'wrapper--regular';

  /**
   * Update the selected choice on click or change event.
   */
  const updateChoice = (
    e:
      | ChangeEvent<HTMLInputElement>
      | MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    const input = e.target as HTMLInputElement;
    onChange &&
      onChange({
        choices: { new: input.value, prev: selectedChoice },
        updateChoice: setSelectedChoice,
      });
    if (e.type === 'change') setSelectedChoice(input.value);
  };

  /**
   * Retrieve an array of radio buttons.
   *
   * @returns {JSX.Element[]} The radio buttons.
   */
  const getOptions = (): JSX.Element[] => {
    return options.map((option) => (
      <LabelledBooleanField
        key={option.id}
        checked={selectedChoice === option.value}
        className={`${styles.option} ${optionClassName}`}
        fieldClassName={styles.radio}
        hidden={isToggle}
        labelClassName={styles.label}
        labelPosition={kind === 'toggle' ? 'right' : labelPosition}
        labelSize={labelSize}
        onChange={updateChoice}
        onClick={updateChoice}
        type="radio"
        {...option}
      />
    ));
  };

  return (
    <Fieldset
      className={`${styles.wrapper} ${styles[alignmentModifier]} ${styles[toggleModifier]} ${className}`}
      legendPosition={legendPosition}
      role="radiogroup"
      {...props}
    >
      {isToggle ? (
        <span className={`${styles.toggle} ${groupClassName}`}>
          {getOptions()}
        </span>
      ) : (
        getOptions()
      )}
    </Fieldset>
  );
};

export default RadioGroup;
