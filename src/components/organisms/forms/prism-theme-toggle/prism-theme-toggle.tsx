import { useCallback, type ChangeEvent, type FC } from 'react';
import { useIntl } from 'react-intl';
import { type PrismTheme, usePrismTheme } from '../../../../utils/providers';
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

  const updateTheme = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTheme(e.target.value === 'light' ? 'light' : 'dark');
    },
    [setTheme]
  );

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
      onSwitch={updateTheme}
      value={isDarkTheme(theme) ? 'dark' : 'light'}
    />
  );
};