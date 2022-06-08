import useAttributes from '@utils/hooks/use-attributes';
import useLocalStorage from '@utils/hooks/use-local-storage';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import RadioGroup, {
  type RadioGroupCallback,
  type RadioGroupCallbackProps,
  type RadioGroupOption,
  type RadioGroupProps,
} from './radio-group';

export type MotionToggleValue = 'on' | 'off';

export type MotionToggleProps = Pick<
  RadioGroupProps,
  'bodyClassName' | 'groupClassName' | 'legendClassName' | 'legendPosition'
> & {
  /**
   * True if motion should be reduced by default.
   */
  defaultValue: 'on' | 'off';
  /**
   * The local storage key to save preference.
   */
  storageKey: string;
};

/**
 * MotionToggle component
 *
 * Render a Toggle component to set reduce motion.
 */
const MotionToggle: FC<MotionToggleProps> = ({
  defaultValue,
  storageKey,
  ...props
}) => {
  const intl = useIntl();
  const { value: isReduced, setValue: setIsReduced } = useLocalStorage<boolean>(
    storageKey,
    defaultValue === 'on' ? false : true
  );
  useAttributes({
    element:
      typeof window !== 'undefined' ? document.documentElement : undefined,
    attribute: 'reduced-motion',
    value: `${isReduced}`,
  });

  const reduceMotionLabel = intl.formatMessage({
    defaultMessage: 'Animations:',
    description: 'MotionToggle: reduce motion label',
    id: '/q5csZ',
  });
  const onLabel = intl.formatMessage({
    defaultMessage: 'On',
    description: 'MotionToggle: activate reduce motion label',
    id: 'va65iw',
  });
  const offLabel = intl.formatMessage({
    defaultMessage: 'Off',
    description: 'MotionToggle: deactivate reduce motion label',
    id: 'pWKyyR',
  });

  const options: RadioGroupOption[] = [
    {
      id: 'reduced-motion-on',
      label: onLabel,
      name: 'reduced-motion',
      value: 'on',
    },
    {
      id: 'reduced-motion-off',
      label: offLabel,
      name: 'reduced-motion',
      value: 'off',
    },
  ];

  /**
   * Update the current setting.
   *
   * @param {string} newValue - A boolean as string.
   */
  const updateSetting = (newValue: MotionToggleValue) => {
    setIsReduced(newValue === 'on' ? false : true);
  };

  /**
   * Handle change events.
   *
   * @param {RadioGroupCallbackProps} props - An object with choices.
   */
  const handleChange: RadioGroupCallback = ({
    choices,
    updateChoice,
  }: RadioGroupCallbackProps) => {
    if (choices.new === choices.prev) {
      const newChoice = choices.new === 'on' ? 'off' : 'on';
      updateChoice(newChoice);
      updateSetting(newChoice);
    } else {
      updateSetting(choices.new as MotionToggleValue);
    }
  };

  return (
    <RadioGroup
      initialChoice={defaultValue}
      kind="toggle"
      legend={reduceMotionLabel}
      onChange={handleChange}
      options={options}
      {...props}
    />
  );
};

export default MotionToggle;
