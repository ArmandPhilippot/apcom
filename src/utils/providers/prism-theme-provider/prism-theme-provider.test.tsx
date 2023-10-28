import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { type FC, useContext } from 'react';
import { PrismThemeContext, PrismThemeProvider } from './prism-theme-provider';

const bodyPrefix = 'Current Prism theme is:';

const ComponentTest: FC = () => {
  const { theme } = useContext(PrismThemeContext);

  return (
    <div>
      {bodyPrefix} {theme}
    </div>
  );
};

describe('PrismThemeProvider', () => {
  it('uses the default value when the provider is not used', () => {
    const defaultValue = 'system';

    render(<ComponentTest />);

    expect(rtlScreen.getByText(new RegExp(bodyPrefix))).toHaveTextContent(
      `${bodyPrefix} ${defaultValue}`
    );
  });

  it('provides the given value to its children and set a matching attribute', () => {
    const attribute = 'ratione';
    const theme = 'dark';

    const { baseElement } = render(
      <PrismThemeProvider
        attribute={attribute}
        defaultTheme={theme}
        storageKey="qui"
      >
        <ComponentTest />
      </PrismThemeProvider>
    );

    expect(rtlScreen.getByText(new RegExp(bodyPrefix))).toHaveTextContent(
      `${bodyPrefix} ${theme}`
    );
    expect(baseElement.parentElement?.getAttribute(`data-${attribute}`)).toBe(
      theme
    );
  });
});
