import { forwardRef, type ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import { useReducedMotion } from '../../../../../utils/hooks';
import { Legend } from '../../../../atoms';
import {
  Switch,
  type SwitchOption,
  type SwitchProps,
} from '../../../../molecules';

export type MotionToggleProps = Omit<
  SwitchProps,
  'isInline' | 'items' | 'legend' | 'name' | 'onSwitch' | 'value'
>;

const MotionToggleWithRef: ForwardRefRenderFunction<
  HTMLFieldSetElement,
  MotionToggleProps
> = (props, ref) => {
  const intl = useIntl();
  const { isReduced, toggleReducedMotion } = useReducedMotion();

  const messages = {
    legend: intl.formatMessage({
      defaultMessage: 'Animations:',
      description: 'MotionToggle: reduce motion label',
      id: '/q5csZ',
    }),
    options: {
      on: intl.formatMessage({
        defaultMessage: 'On',
        description: 'MotionToggle: activate reduce motion label',
        id: 'va65iw',
      }),
      off: intl.formatMessage({
        defaultMessage: 'Off',
        description: 'MotionToggle: deactivate reduce motion label',
        id: 'pWKyyR',
      }),
    },
  };

  const options: [SwitchOption, SwitchOption] = [
    {
      id: 'reduced-motion-on',
      label: messages.options.on,
      value: 'on',
    },
    {
      id: 'reduced-motion-off',
      label: messages.options.off,
      value: 'off',
    },
  ];

  return (
    <Switch
      {...props}
      isInline
      items={options}
      legend={<Legend>{messages.legend}</Legend>}
      // eslint-disable-next-line react/jsx-no-literals
      name="reduced-motion"
      onSwitch={toggleReducedMotion}
      ref={ref}
      value={isReduced ? 'off' : 'on'}
    />
  );
};

/**
 * MotionToggle component
 *
 * Render a Toggle component to set reduce motion.
 */
export const MotionToggle = forwardRef(MotionToggleWithRef);
