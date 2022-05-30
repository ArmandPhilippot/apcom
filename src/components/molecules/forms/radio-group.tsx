import Fieldset, { type FieldsetProps } from '@components/atoms/forms/fieldset';
import { ChangeEvent, FC, useState } from 'react';
import LabelledBooleanField, {
  type LabelledBooleanFieldProps,
} from './labelled-boolean-field';
import styles from './radio-group.module.scss';

export type RadioGroupOption = Pick<
  LabelledBooleanFieldProps,
  'id' | 'label' | 'name' | 'value'
>;

export type RadioGroupProps = Pick<
  FieldsetProps,
  'className' | 'legend' | 'legendClassName'
> &
  Pick<LabelledBooleanFieldProps, 'labelPosition' | 'labelSize'> & {
    /**
     * The default option value.
     */
    initialChoice: string;
    /**
     * The legend position. Default: inline.
     */
    legendPosition?: FieldsetProps['legendPosition'];
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
  initialChoice,
  labelPosition,
  labelSize,
  legendPosition = 'inline',
  options,
  ...props
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string>(initialChoice);
  const wrapperModifier = `wrapper--${legendPosition}`;

  /**
   * Update the selected choice based on the change event target.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const updateChoice = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedChoice(e.target.value);
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
        className={styles.option}
        labelPosition={labelPosition}
        labelSize={labelSize}
        onChange={updateChoice}
        type="radio"
        {...option}
      />
    ));
  };

  return (
    <Fieldset
      className={`${styles.wrapper} ${styles[wrapperModifier]} ${className}`}
      legendPosition={legendPosition}
      {...props}
    >
      {getOptions()}
    </Fieldset>
  );
};

export default RadioGroup;
