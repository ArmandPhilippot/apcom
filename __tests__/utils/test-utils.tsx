import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { FC, ReactElement, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

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
 * @param {ReactElement} ui - A React component.
 * @param {CustomRenderOptions} [options] - An object of render options and providers options.
 * @returns A React component wrapped with all the providers.
 */
const customRender = (ui: ReactElement, options?: CustomRenderOptions) =>
  render(ui, {
    wrapper: (props) => <AllTheProviders {...props} {...options?.providers} />,
    ...options?.testingLibrary,
  });

export * from '@testing-library/react';
export { customRender as render };
