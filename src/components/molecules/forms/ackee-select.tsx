import { SelectOptions } from '@components/atoms/forms/select';
import { Dispatch, SetStateAction, useState, VFC } from 'react';
import { useIntl } from 'react-intl';
import SelectWithTooltip, {
  SelectWithTooltipProps,
} from './select-with-tooltip';

export type AckeeOptions = 'full' | 'partial';

export type AckeeSelectProps = Pick<
  SelectWithTooltipProps,
  'labelClassName' | 'tooltipClassName'
> & {
  /**
   * A default value for Ackee settings.
   */
  initialValue: AckeeOptions;
};

/**
 * AckeeSelect component
 *
 * Render a select to set Ackee settings.
 */
const AckeeSelect: VFC<AckeeSelectProps> = ({ initialValue, ...props }) => {
  const intl = useIntl();
  const [value, setValue] = useState<AckeeOptions>(initialValue);

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
