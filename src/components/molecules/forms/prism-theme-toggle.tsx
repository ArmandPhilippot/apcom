import Moon from '@components/atoms/icons/moon';
import Sun from '@components/atoms/icons/sun';
import Toggle, {
  type ToggleChoices,
  type ToggleProps,
} from '@components/molecules/forms/toggle';
import { usePrismTheme } from '@utils/providers/prism-theme';
import { FC } from 'react';
import { useIntl } from 'react-intl';

export type PrismThemeToggleProps = Pick<ToggleProps, 'labelClassName'>;

/**
 * PrismThemeToggle component
 *
 * Render a Toggle component to set code blocks theme.
 */
const PrismThemeToggle: FC<PrismThemeToggleProps> = ({ ...props }) => {
  const intl = useIntl();
  const { theme, setTheme, resolvedTheme } = usePrismTheme();

  /**
   * Check if the resolved or chosen theme is dark theme.
   *
   * @returns {boolean} True if it is dark theme.
   */
  const isDarkTheme = (): boolean => {
    if (theme === 'system') return resolvedTheme === 'dark';
    return theme === 'dark';
  };

  /**
   * Update the theme.
   */
  const updateTheme = () => {
    setTheme(isDarkTheme() ? 'light' : 'dark');
  };

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
  const themeChoices: ToggleChoices = {
    left: <Sun title={lightThemeLabel} />,
    right: <Moon title={darkThemeLabel} />,
  };

  return (
    <Toggle
      id="prism-theme-settings"
      name="prism-theme-settings"
      label={themeLabel}
      labelSize="medium"
      choices={themeChoices}
      value={isDarkTheme()}
      setValue={updateTheme}
      {...props}
    />
  );
};

export default PrismThemeToggle;
