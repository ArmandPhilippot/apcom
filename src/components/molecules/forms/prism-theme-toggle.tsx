import Moon from '@components/atoms/icons/moon';
import Sun from '@components/atoms/icons/sun';
import { type PrismTheme, usePrismTheme } from '@utils/providers/prism-theme';
import { FC } from 'react';
import { useIntl } from 'react-intl';
import RadioGroup, {
  type RadioGroupCallback,
  type RadioGroupCallbackProps,
  type RadioGroupOption,
  type RadioGroupProps,
} from './radio-group';

export type PrismThemeToggleProps = Pick<
  RadioGroupProps,
  'bodyClassName' | 'groupClassName' | 'legendClassName'
>;

/**
 * PrismThemeToggle component
 *
 * Render a Toggle component to set code blocks theme.
 */
const PrismThemeToggle: FC<PrismThemeToggleProps> = (props) => {
  const intl = useIntl();
  const { theme, setTheme, resolvedTheme } = usePrismTheme();

  /**
   * Check if the resolved or chosen theme is dark theme.
   *
   * @returns {boolean} True if it is dark theme.
   */
  const isDarkTheme = (prismTheme?: PrismTheme): boolean => {
    if (prismTheme === 'system') return resolvedTheme === 'dark';
    return prismTheme === 'dark';
  };

  /**
   * Update the theme.
   *
   * @param {string} newTheme - A theme name.
   */
  const updateTheme = (newTheme: string) => {
    setTheme(newTheme === 'light' ? 'light' : 'dark');
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

  const options: RadioGroupOption[] = [
    {
      id: 'code-blocks-light',
      label: (
        <>
          <span className="screen-reader-text">{lightThemeLabel}</span>
          <Sun />
        </>
      ),
      name: 'code-blocks',
      value: 'light',
    },
    {
      id: 'code-blocks-dark',
      label: (
        <>
          <span className="screen-reader-text">{darkThemeLabel}</span>
          <Moon />
        </>
      ),
      name: 'code-blocks',
      value: 'dark',
    },
  ];

  return (
    <RadioGroup
      initialChoice={isDarkTheme(theme) ? 'dark' : 'light'}
      kind="toggle"
      legend={themeLabel}
      onChange={handleChange}
      options={options}
      {...props}
    />
  );
};

export default PrismThemeToggle;
