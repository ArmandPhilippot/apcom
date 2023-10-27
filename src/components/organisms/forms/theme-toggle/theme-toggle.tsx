import type { FC } from 'react';
import { useIntl } from 'react-intl';
import { Icon, Legend } from '../../../atoms';
import {
  Switch,
  type SwitchOption,
  type SwitchProps,
} from '../../../molecules';
import { useTheme } from 'src/utils/hooks';

export type ThemeToggleProps = Omit<
  SwitchProps,
  'isInline' | 'items' | 'name' | 'onSwitch' | 'value'
>;

/**
 * ThemeToggle component
 *
 * Render a Toggle component to set theme.
 */
export const ThemeToggle: FC<ThemeToggleProps> = (props) => {
  const intl = useIntl();
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';

  const themeLabel = intl.formatMessage({
    defaultMessage: 'Theme:',
    description: 'ThemeToggle: theme label',
    id: 'suXOBu',
  });
  const lightThemeLabel = intl.formatMessage({
    defaultMessage: 'Light theme',
    description: 'ThemeToggle: light theme label',
    id: 'Ygea7s',
  });
  const darkThemeLabel = intl.formatMessage({
    defaultMessage: 'Dark theme',
    description: 'ThemeToggle: dark theme label',
    id: '2QwvtS',
  });

  const options: [SwitchOption, SwitchOption] = [
    {
      id: 'theme-light',
      label: (
        <>
          <span className="screen-reader-text">{lightThemeLabel}</span>
          <Icon shape="sun" />
        </>
      ),
      value: 'light',
    },
    {
      id: 'theme-dark',
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
      name="theme"
      onSwitch={toggleTheme}
      value={isDarkTheme ? 'dark' : 'light'}
    />
  );
};
