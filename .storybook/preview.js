import '@styles/globals.scss';
import { IntlProvider } from 'react-intl';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <IntlProvider locale="en">
      <Story />
    </IntlProvider>
  ),
];
