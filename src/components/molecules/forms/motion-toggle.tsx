import Toggle, {
  ToggleChoices,
  ToggleProps,
} from '@components/molecules/forms/toggle';
import { useState, VFC } from 'react';
import { useIntl } from 'react-intl';

export type MotionToggleProps = Pick<ToggleProps, 'labelClassName' | 'value'>;

/**
 * MotionToggle component
 *
 * Render a Toggle component to set reduce motion.
 */
const MotionToggle: VFC<MotionToggleProps> = ({ value, ...props }) => {
  const intl = useIntl();
  const [isDeactivated, setIsDeactivated] = useState<boolean>(value);
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
  const reduceMotionChoices: ToggleChoices = {
    left: onLabel,
    right: offLabel,
  };

  return (
    <Toggle
      id="reduce-motion-settings"
      name="reduce-motion-settings"
      label={reduceMotionLabel}
      labelSize="medium"
      choices={reduceMotionChoices}
      value={isDeactivated}
      setValue={setIsDeactivated}
      {...props}
    />
  );
};

export default MotionToggle;
