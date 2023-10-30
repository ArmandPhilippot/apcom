import { forwardRef, type ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import { useTheme } from '../../../../../utils/hooks';
import { Icon, Legend } from '../../../../atoms';
import {
  Switch,
  type SwitchOption,
  type SwitchProps,
} from '../../../../molecules';

export type ThemeToggleProps = Omit<
  SwitchProps,
  'isInline' | 'items' | 'legend' | 'name' | 'onSwitch' | 'value'
>;

const ThemeToggleWithRef: ForwardRefRenderFunction<
  HTMLFieldSetElement,
  ThemeToggleProps
> = (props, ref) => {
  const intl = useIntl();
  const { resolvedTheme, toggleTheme } = useTheme();

  const messages = {
    legend: intl.formatMessage({
      defaultMessage: 'Theme:',
      description: 'ThemeToggle: theme label',
      id: 'suXOBu',
    }),
    options: {
      dark: intl.formatMessage({
        defaultMessage: 'Dark theme',
        description: 'ThemeToggle: dark theme label',
        id: '2QwvtS',
      }),
      light: intl.formatMessage({
        defaultMessage: 'Light theme',
        description: 'ThemeToggle: light theme label',
        id: 'Ygea7s',
      }),
    },
  };

  const options: [SwitchOption, SwitchOption] = [
    {
      id: 'theme-light',
      // eslint-disable-next-line react/jsx-no-literals
      label: <Icon aria-label={messages.options.light} shape="sun" size="sm" />,
      value: 'light',
    },
    {
      id: 'theme-dark',
      // eslint-disable-next-line react/jsx-no-literals
      label: <Icon aria-label={messages.options.dark} shape="moon" size="sm" />,
      value: 'dark',
    },
  ];

  return (
    <Switch
      {...props}
      isInline
      items={options}
      legend={<Legend>{messages.legend}</Legend>}
      // eslint-disable-next-line react/jsx-no-literals
      name="theme"
      onSwitch={toggleTheme}
      ref={ref}
      value={resolvedTheme}
    />
  );
};

/**
 * ThemeToggle component
 *
 * Render a Toggle component to set theme.
 */
export const ThemeToggle = forwardRef(ThemeToggleWithRef);
