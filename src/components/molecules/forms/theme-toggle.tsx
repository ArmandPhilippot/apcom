import Moon from '@components/atoms/icons/moon';
import Sun from '@components/atoms/icons/sun';
import Toggle, {
  type ToggleChoices,
  type ToggleProps,
} from '@components/molecules/forms/toggle';
import { FC, useState } from 'react';
import { useIntl } from 'react-intl';

export type ThemeToggleProps = Pick<ToggleProps, 'labelClassName' | 'value'>;

/**
 * ThemeToggle component
 *
 * Render a Toggle component to set theme.
 */
const ThemeToggle: FC<ThemeToggleProps> = ({ value, ...props }) => {
  const intl = useIntl();
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(value);
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
  const themeChoices: ToggleChoices = {
    left: <Sun title={lightThemeLabel} />,
    right: <Moon title={darkThemeLabel} />,
  };

  return (
    <Toggle
      id="theme-settings"
      name="theme-settings"
      label={themeLabel}
      labelSize="medium"
      choices={themeChoices}
      value={isDarkTheme}
      setValue={setIsDarkTheme}
      {...props}
    />
  );
};

export default ThemeToggle;
