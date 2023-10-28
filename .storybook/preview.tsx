import type { Decorator, Preview } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';
import { FC, ReactNode, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import {
  AckeeProvider,
  MotionProvider,
  PrismThemeProvider,
  ThemeProvider,
} from '../src/utils/providers';
import '../src/styles/globals.scss';
import { DocsContainer } from './overrides/docs-container';
import dark from './themes/dark';
import light from './themes/light';
import { useTheme } from '../src/utils/hooks';

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
      <ThemeProvider attribute="theme" storageKey="theme">
        <PrismThemeProvider
          attribute="data-prismjs-color-scheme-current"
          storageKey="prismjs-color-scheme"
        >
          <MotionProvider
            attribute="reduced-motion"
            storageKey="reduced-motion"
          >
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
        </PrismThemeProvider>
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
