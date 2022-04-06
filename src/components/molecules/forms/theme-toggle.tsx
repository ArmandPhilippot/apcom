import Toggle, {
  ToggleChoices,
  ToggleProps,
} from '@components/atoms/forms/toggle';
import Moon from '@components/atoms/icons/moon';
import Sun from '@components/atoms/icons/sun';
import { FC, useState } from 'react';
import { useIntl } from 'react-intl';

export type ThemeToggleProps = Pick<ToggleProps, 'value'>;

/**
 * ThemeToggle component
 *
 * Render a Toggle component to set theme.
 */
const ThemeToggle: FC<ThemeToggleProps> = ({ value }) => {
  const intl = useIntl();
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(value);
  const themeLabel = intl.formatMessage({
    defaultMessage: 'Theme:',
    description: 'SettingsModal: theme label',
    id: 'SGPivK',
  });
  const lightThemeLabel = intl.formatMessage({
    defaultMessage: 'Light theme',
    description: 'SettingsModal: light theme label',
    id: 'jPxP9t',
  });
  const darkThemeLabel = intl.formatMessage({
    defaultMessage: 'Dark theme',
    description: 'SettingsModal: dark theme label',
    id: 'E5JCDA',
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
      choices={themeChoices}
      value={isDarkTheme}
      setValue={setIsDarkTheme}
    />
  );
};

export default ThemeToggle;
