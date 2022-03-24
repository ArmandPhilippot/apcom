import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { FC } from 'react';
import { IntlProvider } from 'react-intl';

type ProvidersConfig = {
  locale?: 'en' | 'fr';
};

type CustomRenderOptions = {
  providers: ProvidersConfig;
  testingLibrary: Omit<RenderOptions, 'wrapper'>;
};

/**
 * Return a component wrapped with Intl and Theme Provider.
 *
 * @returns A component wrapped Intl and Theme providers.
 */
const AllTheProviders: FC<ProvidersConfig> = ({ children, locale = 'en' }) => {
  return (
    <IntlProvider locale={locale}>
      <ThemeProvider>{children}</ThemeProvider>
    </IntlProvider>
  );
};

/**
 * Render a component with all the providers.
 *
 * @param {JSX.Element} ui - A React component.
 * @param {CustomRenderOptions} [options] - An object of render options and providers options.
 * @returns A React component wrapped with all the providers.
 */
const customRender = (ui: JSX.Element, options?: CustomRenderOptions) =>
  render(ui, {
    wrapper: () => <AllTheProviders {...options?.providers} />,
    ...options?.testingLibrary,
  });

export * from '@testing-library/react';
export { customRender as render };
