import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { usePrismTheme } from '../../../../utils/hooks';
import { Icon, Legend } from '../../../atoms';
import {
  Switch,
  type SwitchOption,
  type SwitchProps,
} from '../../../molecules';

export type PrismThemeToggleProps = Omit<
  SwitchProps,
  'isInline' | 'items' | 'name' | 'onSwitch' | 'value'
>;

/**
 * PrismThemeToggle component
 *
 * Render a Toggle component to set code blocks theme.
 */
export const PrismThemeToggle: FC<PrismThemeToggleProps> = (props) => {
  const intl = useIntl();
  const { currentTheme, toggleTheme } = usePrismTheme();

  const themeLabel = intl.formatMessage({
    defaultMessage: 'Code blocks:',
    description: 'PrismThemeToggle: theme label',
    id: 'ftXN+0',
  });
  const lightThemeLabel = intl.formatMessage({
    defaultMessage: 'Light theme',
    description: 'PrismThemeToggle: light theme label',
    id: 'tsWh8x',
  });
  const darkThemeLabel = intl.formatMessage({
    defaultMessage: 'Dark theme',
    description: 'PrismThemeToggle: dark theme label',
    id: 'og/zWL',
  });

  const options: [SwitchOption, SwitchOption] = [
    {
      id: 'code-blocks-light',
      label: (
        <>
          <span className="screen-reader-text">{lightThemeLabel}</span>
          <Icon shape="sun" />
        </>
      ),
      value: 'light',
    },
    {
      id: 'code-blocks-dark',
      label: (
        <>
          <span className="screen-reader-text">{darkThemeLabel}</span>
          <Icon shape="moon" />
        </>
      ),
      value: 'dark',
    },
  ];

  return (
    <Switch
      {...props}
      isInline
      items={options}
      legend={<Legend>{themeLabel}</Legend>}
      name="code-blocks"
      onSwitch={toggleTheme}
      value={currentTheme}
    />
  );
};
