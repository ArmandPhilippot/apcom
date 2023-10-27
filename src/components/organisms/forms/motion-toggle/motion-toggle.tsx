import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useReducedMotion } from '../../../../utils/hooks';
import { Legend } from '../../../atoms';
import {
  Switch,
  type SwitchOption,
  type SwitchProps,
} from '../../../molecules';

export type MotionToggleProps = Omit<
  SwitchProps,
  'isInline' | 'items' | 'name' | 'onSwitch' | 'value'
>;

/**
 * MotionToggle component
 *
 * Render a Toggle component to set reduce motion.
 */
export const MotionToggle: FC<MotionToggleProps> = ({ ...props }) => {
  const intl = useIntl();
  const { isReduced, toggleReducedMotion } = useReducedMotion();

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

  return (
    <Switch
      {...props}
      isInline
      items={options}
      legend={<Legend>{reduceMotionLabel}</Legend>}
      name="reduced-motion"
      onSwitch={toggleReducedMotion}
      value={isReduced ? 'off' : 'on'}
    />
  );
};
