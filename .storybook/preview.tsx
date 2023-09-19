import type { Decorator, Preview } from '@storybook/react';
import { ThemeProvider, useTheme } from 'next-themes';
import { FC, ReactNode, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useDarkMode } from 'storybook-dark-mode';
import { DocsContainer } from './overrides/docs-container';
import dark from './themes/dark';
import light from './themes/light';
import '../src/styles/globals.scss';

type ThemeWrapperProps = {
  children: ReactNode;
};

// Create a component that listens for theme change.
export const ThemeWrapper: FC<ThemeWrapperProps> = ({ children }) => {
  const { setTheme } = useTheme();
  const theme = useDarkMode() ? 'dark' : 'light';

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return <>{children}</>;
};

const withAllProviders: Decorator = (Story) => {
  return (
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
  );
};

const preview: Preview = {
  decorators: [withAllProviders],
  parameters: {
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
  },
};

export default preview;
