import { ThemeProvider, useTheme } from 'next-themes';
import { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useDarkMode } from 'storybook-dark-mode';
import { DocsContainer } from './overrides/docs-container';
import dark from './themes/dark';
import light from './themes/light';
import '../src/styles/globals.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...dark },
    // Override the default light theme
    light: { ...light },
    stylePreview: true,
  },
  docs: {
    container: DocsContainer,
  },
};

// Create a component that listens for theme change.
export const ThemeWrapper = (props) => {
  const { setTheme } = useTheme();
  const theme = useDarkMode() ? 'dark' : 'light';

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return <>{props.children}</>;
};

export const decorators = [
  (Story) => (
    <IntlProvider locale="en">
      <ThemeProvider
        defaultTheme="system"
        enableColorScheme={true}
        enableSystem={true}
      >
        <ThemeWrapper>
          <Story />
        </ThemeWrapper>
      </ThemeProvider>
    </IntlProvider>
  ),
];
