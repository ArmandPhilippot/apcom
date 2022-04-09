import Moon from '@components/atoms/icons/moon';
import Sun from '@components/atoms/icons/sun';
import Toggle, {
  ToggleChoices,
  ToggleProps,
} from '@components/molecules/forms/toggle';
import { useState, VFC } from 'react';
import { useIntl } from 'react-intl';

export type PrismThemeToggleProps = Pick<
  ToggleProps,
  'labelClassName' | 'value'
>;

/**
 * PrismThemeToggle component
 *
 * Render a Toggle component to set code blocks theme.
 */
const PrismThemeToggle: VFC<PrismThemeToggleProps> = ({ value, ...props }) => {
  const intl = useIntl();
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(value);
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
      value={isDarkTheme}
      setValue={setIsDarkTheme}
      {...props}
    />
  );
};

export default PrismThemeToggle;
