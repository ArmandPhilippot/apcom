import { type SelectOptions } from '@components/atoms/forms/select';
import useLocalStorage from '@utils/hooks/use-local-storage';
import useUpdateAckeeOptions, {
  type AckeeOptions,
} from '@utils/hooks/use-update-ackee-options';
import { Dispatch, FC, SetStateAction } from 'react';
import { useIntl } from 'react-intl';
import SelectWithTooltip, {
  type SelectWithTooltipProps,
} from './select-with-tooltip';

export type AckeeSelectProps = Pick<
  SelectWithTooltipProps,
  'className' | 'labelClassName' | 'tooltipClassName'
> & {
  /**
   * A default value for Ackee settings.
   */
  initialValue: AckeeOptions;
  /**
   * The local storage key to save preference.
   */
  storageKey: string;
};

/**
 * AckeeSelect component
 *
 * Render a select to set Ackee settings.
 */
const AckeeSelect: FC<AckeeSelectProps> = ({
  initialValue,
  storageKey,
  ...props
}) => {
  const intl = useIntl();
  const { value, setValue } = useLocalStorage<AckeeOptions>(
    storageKey,
    initialValue
  );
  useUpdateAckeeOptions(value);

  const ackeeLabel = intl.formatMessage({
    defaultMessage: 'Tracking:',
    description: 'AckeeSelect: select label',
    id: '2pmylc',
  });
  const tooltipTitle = intl.formatMessage({
    defaultMessage: 'Ackee tracking (analytics)',
    description: 'AckeeSelect: tooltip title',
    id: 'F1EQX3',
  });
  const tooltipContent = [
    intl.formatMessage({
      defaultMessage: 'Partial includes only page url, views and duration.',
      description: 'AckeeSelect: tooltip message',
      id: 'skb4W5',
    }),
    intl.formatMessage({
      defaultMessage:
        'Full includes all information from partial as well as information about referrer, operating system, device, browser, screen size and language.',
      description: 'AckeeSelect: tooltip message',
      id: 'Ogccx6',
    }),
  ];
  const options: SelectOptions[] = [
    {
      id: 'partial',
      name: intl.formatMessage({
        defaultMessage: 'Partial',
        description: 'AckeeSelect: partial option name',
        id: 'e/8Kyj',
      }),
      value: 'partial',
    },
    {
      id: 'full',
      name: intl.formatMessage({
        defaultMessage: 'Full',
        description: 'AckeeSelect: full option name',
        id: 'PzRpPw',
      }),
      value: 'full',
    },
  ];

  return (
    <SelectWithTooltip
      id="ackee-settings"
      name="ackee-settings"
      label={ackeeLabel}
      labelSize="medium"
      options={options}
      title={tooltipTitle}
      content={tooltipContent}
      value={value}
      setValue={setValue as Dispatch<SetStateAction<string>>}
      {...props}
    />
  );
};

export default AckeeSelect;
