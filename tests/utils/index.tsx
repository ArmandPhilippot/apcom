import {
  render as rtlRender,
  type RenderOptions,
} from '@testing-library/react';
import type { FC, ReactElement, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import {
  AckeeProvider,
  MotionProvider,
  ThemeProvider,
} from '../../src/utils/providers';

type ProvidersConfig = {
  children: ReactNode;
  locale?: 'en' | 'fr';
};

type CustomRenderOptions = {
  providers?: ProvidersConfig;
  testingLibrary?: Omit<RenderOptions, 'wrapper'>;
};

/**
 * Return a component wrapped with Intl and Theme Provider.
 *
 * @returns A component wrapped Intl and Theme providers.
 */
const AllTheProviders: FC<ProvidersConfig> = ({ children, locale = 'en' }) => (
  <IntlProvider locale={locale}>
    <ThemeProvider attribute="theme" storageKey="theme">
      <AckeeProvider
        domainId="any-id"
        server="https://example.test"
        storageKey="ackee"
        tracking="full"
      >
        <MotionProvider
          attribute="reduced-motion"
          hasReducedMotion={false}
          storageKey="reduced-motion"
        >
          {children}
        </MotionProvider>
      </AckeeProvider>
    </ThemeProvider>
  </IntlProvider>
);

/**
 * Render a component with all the providers.
 *
 * @param {ReactElement} ui - A React component.
 * @param {CustomRenderOptions} [options] - An object of render options and providers options.
 * @returns A React component wrapped with all the providers.
 */
const render = (ui: ReactElement, options?: CustomRenderOptions) =>
  rtlRender(ui, {
    wrapper: (props) => <AllTheProviders {...props} {...options?.providers} />,
    ...options?.testingLibrary,
  });

/* eslint-disable import/export */
export * from '@testing-library/react';
export { render };
