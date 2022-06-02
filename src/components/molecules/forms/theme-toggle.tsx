import Moon from '@components/atoms/icons/moon';
import Sun from '@components/atoms/icons/sun';
import { useTheme } from 'next-themes';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import RadioGroup, {
  type RadioGroupCallback,
  type RadioGroupCallbackProps,
  type RadioGroupOption,
  type RadioGroupProps,
} from './radio-group';

export type ThemeToggleProps = Pick<
  RadioGroupProps,
  'bodyClassName' | 'groupClassName' | 'legendClassName'
>;

/**
 * ThemeToggle component
 *
 * Render a Toggle component to set theme.
 */
const ThemeToggle: FC<ThemeToggleProps> = (props) => {
  const intl = useIntl();
  const { resolvedTheme, setTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';

  /**
   * Update the theme.
   *
   * @param {string} theme - A theme name.
   */
  const updateTheme = (theme: string) => {
    setTheme(theme === 'light' ? 'light' : 'dark');
  };

  /**
   * Handle change events.
   *
   * @param {RadioGroupCallbackProps} props - An object with choices.
   */
  const handleChange: RadioGroupCallback = ({
    choices,
    updateChoice,
  }: RadioGroupCallbackProps) => {
    if (choices.new === choices.prev) {
      const newTheme = choices.new === 'light' ? 'dark' : 'light';
      updateChoice(newTheme);
      updateTheme(newTheme);
    } else {
      updateTheme(choices.new);
    }
  };

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

  const options: RadioGroupOption[] = [
    {
      id: 'theme-light',
      label: (
        <>
          <span className="screen-reader-text">{lightThemeLabel}</span>
          <Sun />
        </>
      ),
      name: 'theme',
      value: 'light',
    },
    {
      id: 'theme-dark',
      label: (
        <>
          <span className="screen-reader-text">{darkThemeLabel}</span>
          <Moon />
        </>
      ),
      name: 'theme',
      value: 'dark',
    },
  ];

  return (
    <RadioGroup
      initialChoice={isDarkTheme ? 'dark' : 'light'}
      kind="toggle"
      legend={themeLabel}
      onChange={handleChange}
      options={options}
      {...props}
    />
  );
};

export default ThemeToggle;
