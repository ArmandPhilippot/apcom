import { useCallback, type FC } from 'react';
import { useIntl } from 'react-intl';
import { useAttributes, useLocalStorage } from '../../../../utils/hooks';
import { Legend } from '../../../atoms';
import {
  Switch,
  type SwitchOption,
  type SwitchProps,
} from '../../../molecules';

export type MotionToggleValue = 'on' | 'off';

const validator = (value: unknown): value is boolean =>
  typeof value === 'boolean';

export type MotionToggleProps = Omit<
  SwitchProps,
  'isInline' | 'items' | 'name' | 'onSwitch' | 'value'
> & {
  /**
   * True if motion should be reduced by default.
   */
  defaultValue: MotionToggleValue;
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
export const MotionToggle: FC<MotionToggleProps> = ({
  defaultValue,
  storageKey,
  ...props
}) => {
  const intl = useIntl();
  const [isReduced, setIsReduced] = useLocalStorage(
    storageKey,
    defaultValue !== 'on',
    validator
  );
  useAttributes({
    element:
      typeof window === 'undefined' ? undefined : document.documentElement,
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

  const options: [SwitchOption, SwitchOption] = [
    {
      id: 'reduced-motion-on',
      label: onLabel,
      value: 'on',
    },
    {
      id: 'reduced-motion-off',
      label: offLabel,
      value: 'off',
    },
  ];

  const updateSetting = useCallback(() => {
    setIsReduced((prev) => !prev);
  }, [setIsReduced]);

  return (
    <Switch
      {...props}
      isInline
      items={options}
      legend={<Legend>{reduceMotionLabel}</Legend>}
      name="reduced-motion"
      onSwitch={updateSetting}
      value={isReduced ? 'off' : 'on'}
    />
  );
};
