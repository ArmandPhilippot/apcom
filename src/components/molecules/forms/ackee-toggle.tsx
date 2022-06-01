import useLocalStorage from '@utils/hooks/use-local-storage';
import useUpdateAckeeOptions, {
  type AckeeOptions,
} from '@utils/hooks/use-update-ackee-options';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import RadioGroup, {
  type RadioGroupCallback,
  type RadioGroupCallbackProps,
  type RadioGroupOption,
  type RadioGroupProps,
} from './radio-group';
import Tooltip, { type TooltipProps } from '../modals/tooltip';

export type AckeeToggleProps = Pick<
  RadioGroupProps,
  'bodyClassName' | 'groupClassName' | 'legendClassName'
> & {
  /**
   * Set additional classnames to the toggle wrapper.
   */
  className?: string;
  /**
   * True if motion should be reduced by default.
   */
  defaultValue: AckeeOptions;
  /**
   * The local storage key to save preference.
   */
  storageKey: string;
  /**
   * Set additional classnames to the tooltip wrapper.
   */
  tooltipClassName?: TooltipProps['className'];
};

/**
 * AckeeToggle component
 *
 * Render a Toggle component to set reduce motion.
 */
const AckeeToggle: FC<AckeeToggleProps> = ({
  defaultValue,
  storageKey,
  tooltipClassName,
  ...props
}) => {
  const intl = useIntl();
  const { value, setValue } = useLocalStorage<AckeeOptions>(
    storageKey,
    defaultValue
  );
  useUpdateAckeeOptions(value);

  const ackeeLabel = intl.formatMessage({
    defaultMessage: 'Tracking:',
    description: 'AckeeToggle: select label',
    id: '0gVlI3',
  });
  const tooltipTitle = intl.formatMessage({
    defaultMessage: 'Ackee tracking (analytics)',
    description: 'AckeeToggle: tooltip title',
    id: 'nGss/j',
  });
  const tooltipContent = [
    intl.formatMessage({
      defaultMessage: 'Partial includes only page url, views and duration.',
      description: 'AckeeToggle: tooltip message',
      id: 'ZB/Aw2',
    }),
    intl.formatMessage({
      defaultMessage:
        'Full includes all information from partial as well as information about referrer, operating system, device, browser, screen size and language.',
      description: 'AckeeToggle: tooltip message',
      id: '7zDlQo',
    }),
  ];
  const partialLabel = intl.formatMessage({
    defaultMessage: 'Partial',
    description: 'AckeeToggle: partial option name',
    id: 'tIZYpD',
  });
  const fullLabel = intl.formatMessage({
    defaultMessage: 'Full',
    description: 'AckeeToggle: full option name',
    id: '5eD6y2',
  });

  const options: RadioGroupOption[] = [
    {
      id: 'ackee-full',
      label: fullLabel,
      name: 'ackee',
      value: 'full',
    },
    {
      id: 'ackee-partial',
      label: partialLabel,
      name: 'ackee',
      value: 'partial',
    },
  ];

  /**
   * Handle change events.
   *
   * @param {RadioGroupCallbackProps} props - An object with choices.
   */
  const handleChange: RadioGroupCallback = ({
    choices,
    updateChoice,
  }: RadioGroupCallbackProps) => {
    let newChoice: AckeeOptions = choices.new as AckeeOptions;

    if (choices.new === choices.prev) {
      newChoice = choices.new === 'full' ? 'partial' : 'full';
      updateChoice(newChoice);
    }

    setValue(newChoice);
  };

  return (
    <RadioGroup
      initialChoice={value}
      kind="toggle"
      legend={ackeeLabel}
      onChange={handleChange}
      options={options}
      Tooltip={
        <Tooltip
          title={tooltipTitle}
          content={tooltipContent}
          icon="?"
          className={tooltipClassName}
        />
      }
      {...props}
    />
  );
};

export default AckeeToggle;
