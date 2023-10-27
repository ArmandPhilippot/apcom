import type { Decorator, Preview } from '@storybook/react';
import { ThemeProvider, useTheme } from 'next-themes';
import { useDarkMode } from 'storybook-dark-mode';
import { FC, ReactNode, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { AckeeProvider, MotionProvider } from '../src/utils/providers';
import '../src/styles/globals.scss';
import { DocsContainer } from './overrides/docs-container';
import dark from './themes/dark';
import light from './themes/light';

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
        <MotionProvider attribute="reduced-motion" storageKey="reduced-motion">
          <AckeeProvider
            domainId="any"
            server="https://example.com"
            storageKey="ackee"
            tracking="full"
          >
            <ThemeWrapper>
              <Story />
            </ThemeWrapper>
          </AckeeProvider>
        </MotionProvider>
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
