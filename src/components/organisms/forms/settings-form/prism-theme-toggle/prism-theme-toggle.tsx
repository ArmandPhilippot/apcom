import { forwardRef, type ForwardRefRenderFunction } from 'react';
import { useIntl } from 'react-intl';
import { usePrismTheme } from '../../../../../utils/hooks';
import { Icon, Legend } from '../../../../atoms';
import {
  Switch,
  type SwitchOption,
  type SwitchProps,
} from '../../../../molecules';

export type PrismThemeToggleProps = Omit<
  SwitchProps,
  'isInline' | 'items' | 'legend' | 'name' | 'onSwitch' | 'value'
>;

const PrismThemeToggleWithRef: ForwardRefRenderFunction<
  HTMLFieldSetElement,
  PrismThemeToggleProps
> = (props, ref) => {
  const intl = useIntl();
  const { currentTheme, toggleTheme } = usePrismTheme();

  const messages = {
    legend: intl.formatMessage({
      defaultMessage: 'Code blocks:',
      description: 'PrismThemeToggle: theme label',
      id: 'ftXN+0',
    }),
    options: {
      dark: intl.formatMessage({
        defaultMessage: 'Dark theme',
        description: 'PrismThemeToggle: dark theme label',
        id: 'og/zWL',
      }),
      light: intl.formatMessage({
        defaultMessage: 'Light theme',
        description: 'PrismThemeToggle: light theme label',
        id: 'tsWh8x',
      }),
    },
  };

  const options: [SwitchOption, SwitchOption] = [
    {
      id: 'code-blocks-light',
      // eslint-disable-next-line react/jsx-no-literals
      label: <Icon aria-label={messages.options.light} shape="sun" size="sm" />,
      value: 'light',
    },
    {
      id: 'code-blocks-dark',
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
      name="code-blocks"
      onSwitch={toggleTheme}
      ref={ref}
      value={currentTheme}
    />
  );
};

/**
 * PrismThemeToggle component
 *
 * Render a Toggle component to set code blocks theme.
 */
export const PrismThemeToggle = forwardRef(PrismThemeToggleWithRef);
