import { forwardRef, type ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import { useAckee, useBoolean } from '../../../../../utils/hooks';
import { Legend, List, ListItem } from '../../../../atoms';
import {
  Switch,
  type SwitchOption,
  type SwitchProps,
  Tooltip,
  type TooltipProps,
} from '../../../../molecules';
import styles from './ackee-toggle.module.scss';

export type AckeeToggleProps = Omit<
  SwitchProps,
  'isInline' | 'items' | 'legend' | 'name' | 'onSwitch' | 'value'
> &
  Pick<TooltipProps, 'direction'>;

const AckeeToggleWithRef: ForwardRefRenderFunction<
  HTMLFieldSetElement,
  AckeeToggleProps
> = ({ direction, ...props }, ref) => {
  const intl = useIntl();
  const [tracking, toggleTracking] = useAckee();
  const {
    deactivate: closeTooltip,
    state: isTooltipOpened,
    toggle: toggleTooltip,
  } = useBoolean(false);

  const messages = {
    legend: intl.formatMessage({
      defaultMessage: 'Tracking:',
      description: 'AckeeToggle: select label',
      id: '0gVlI3',
    }),
    options: {
      full: intl.formatMessage({
        defaultMessage: 'Full',
        description: 'AckeeToggle: full option name',
        id: '5eD6y2',
      }),
      partial: intl.formatMessage({
        defaultMessage: 'Partial',
        description: 'AckeeToggle: partial option name',
        id: 'tIZYpD',
      }),
    },
    tooltip: {
      heading: intl.formatMessage({
        defaultMessage: 'Ackee tracking (analytics)',
        description: 'AckeeToggle: tooltip title',
        id: 'nGss/j',
      }),
      contents: {
        full: intl.formatMessage({
          defaultMessage:
            'Full includes all information from partial as well as information about referrer, operating system, device, browser, screen size and language.',
          description: 'AckeeToggle: tooltip message',
          id: '7zDlQo',
        }),
        partial: intl.formatMessage({
          defaultMessage: 'Partial includes only page url, views and duration.',
          description: 'AckeeToggle: tooltip message',
          id: 'ZB/Aw2',
        }),
      },
    },
  };

  const options = [
    { id: 'ackee-full' as const, label: messages.options.full, value: 'full' },
    {
      id: 'ackee-partial' as const,
      label: messages.options.partial,
      value: 'partial',
    },
  ] satisfies [SwitchOption, SwitchOption];

  return (
    <Switch
      {...props}
      isInline
      items={options}
      legend={<Legend>{messages.legend}</Legend>}
      // eslint-disable-next-line react/jsx-no-literals
      name="ackee"
      onSwitch={toggleTracking}
      ref={ref}
      tooltip={
        <Tooltip
          className={styles.tooltip}
          direction={direction}
          heading={messages.tooltip.heading}
          isOpen={isTooltipOpened}
          onClickOutside={closeTooltip}
          onToggle={toggleTooltip}
        >
          <List>
            <ListItem>{messages.tooltip.contents.full}</ListItem>
            <ListItem>{messages.tooltip.contents.partial}</ListItem>
          </List>
        </Tooltip>
      }
      value={tracking}
    />
  );
};

/**
 * AckeeToggle component
 *
 * Render a Toggle component to set tracking.
 */
export const AckeeToggle = forwardRef(AckeeToggleWithRef);
