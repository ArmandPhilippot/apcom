/* eslint-disable max-statements */
import { type ChangeEvent, type FC, useState, useCallback } from 'react';
import { useIntl } from 'react-intl';
import {
  type AckeeOptions,
  useLocalStorage,
  useUpdateAckeeOptions,
} from '../../../../utils/hooks';
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
  'isInline' | 'items' | 'name' | 'onSwitch' | 'value'
> &
  Pick<TooltipProps, 'direction'> & {
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
  };

/**
 * AckeeToggle component
 *
 * Render a Toggle component to set reduce motion.
 */
export const AckeeToggle: FC<AckeeToggleProps> = ({
  defaultValue,
  direction,
  storageKey,
  ...props
}) => {
  const intl = useIntl();
  const { value, setValue } = useLocalStorage<AckeeOptions>(
    storageKey,
    defaultValue
  );
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);

  useUpdateAckeeOptions(value);

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

  const updateSetting = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value === 'full' ? 'full' : 'partial');
    },
    [setValue]
  );

  const closeTooltip = useCallback(() => {
    setIsTooltipOpened(false);
  }, []);
  const toggleTooltip = useCallback(() => {
    setIsTooltipOpened((prev) => !prev);
  }, []);

  return (
    <Switch
      {...props}
      isInline
      items={options}
      legend={<Legend>{ackeeLabel}</Legend>}
      name="ackee"
      onSwitch={updateSetting}
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
      value={value}
    />
  );
};
