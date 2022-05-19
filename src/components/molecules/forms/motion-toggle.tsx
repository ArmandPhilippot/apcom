import Toggle, {
  type ToggleChoices,
  type ToggleProps,
} from '@components/molecules/forms/toggle';
import useAttributes from '@utils/hooks/use-attributes';
import useLocalStorage from '@utils/hooks/use-local-storage';
import { FC } from 'react';
import { useIntl } from 'react-intl';

export type MotionToggleProps = Pick<
  ToggleProps,
  'labelClassName' | 'value'
> & {
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
  storageKey,
  value,
  ...props
}) => {
  const intl = useIntl();
  const { value: isReduced, setValue: setIsReduced } = useLocalStorage<boolean>(
    storageKey,
    value
  );
  useAttributes({
    element: document.documentElement || undefined,
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
      value={isReduced}
      setValue={setIsReduced}
      {...props}
    />
  );
};

export default MotionToggle;
