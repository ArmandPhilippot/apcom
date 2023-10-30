/* eslint-disable max-statements */
import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { useAckee, useBoolean } from '../../../../utils/hooks';
import { Legend, List, ListItem } from '../../../atoms';
import {
  Switch,
  type SwitchOption,
  type SwitchProps,
  Tooltip,
  type TooltipProps,
} from '../../../molecules';

export type AckeeToggleProps = Omit<
  SwitchProps,
  'defaultValue' | 'isInline' | 'items' | 'name' | 'onSwitch' | 'value'
> &
  Pick<TooltipProps, 'direction'>;

/**
 * AckeeToggle component
 *
 * Render a Toggle component to set reduce motion.
 */
export const AckeeToggle: FC<AckeeToggleProps> = ({ direction, ...props }) => {
  const intl = useIntl();
  const [tracking, toggleTracking] = useAckee();
  const {
    deactivate: closeTooltip,
    state: isTooltipOpened,
    toggle: toggleTooltip,
  } = useBoolean(false);

  const ackeeLabel = intl.formatMessage({
    defaultMessage: 'Tracking:',
    description: 'AckeeToggle: select label',
    id: '0gVlI3',
  });
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
  const tooltipTitle = intl.formatMessage({
    defaultMessage: 'Ackee tracking (analytics)',
    description: 'AckeeToggle: tooltip title',
    id: 'nGss/j',
  });
  const tooltipPartial = intl.formatMessage({
    defaultMessage: 'Partial includes only page url, views and duration.',
    description: 'AckeeToggle: tooltip message',
    id: 'ZB/Aw2',
  });
  const tooltipFull = intl.formatMessage({
    defaultMessage:
      'Full includes all information from partial as well as information about referrer, operating system, device, browser, screen size and language.',
    description: 'AckeeToggle: tooltip message',
    id: '7zDlQo',
  });

  const options = [
    { id: 'ackee-full' as const, label: fullLabel, value: 'full' },
    { id: 'ackee-partial' as const, label: partialLabel, value: 'partial' },
  ] satisfies [SwitchOption, SwitchOption];

  return (
    <Switch
      {...props}
      isInline
      items={options}
      legend={<Legend>{ackeeLabel}</Legend>}
      name="ackee"
      onSwitch={toggleTracking}
      tooltip={
        <Tooltip
          direction={direction}
          heading={tooltipTitle}
          isOpen={isTooltipOpened}
          onClickOutside={closeTooltip}
          onToggle={toggleTooltip}
        >
          <List>
            {options.map((option) => (
              <ListItem key={option.id}>
                {option.id === 'ackee-full' ? tooltipFull : tooltipPartial}
              </ListItem>
            ))}
          </List>
        </Tooltip>
      }
      value={tracking}
    />
  );
};
