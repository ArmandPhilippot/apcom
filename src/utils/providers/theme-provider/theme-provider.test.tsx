import { describe, expect, it } from '@jest/globals';
import { render, screen as rtlScreen } from '@testing-library/react';
import { type FC, useContext } from 'react';
import { getThemeFromSystem } from '../../helpers';
import { ThemeContext, ThemeProvider } from './theme-provider';

const bodyPrefix = 'Current theme is:';

const ComponentTest: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      {bodyPrefix} {theme}
    </div>
  );
};

describe('ThemeProvider', () => {
  it('uses the default value when the provider is not used', () => {
    const defaultValue = 'system';

    render(<ComponentTest />);

    expect(rtlScreen.getByText(new RegExp(bodyPrefix))).toHaveTextContent(
      `${bodyPrefix} ${defaultValue}`
    );
  });

  it('provides the given value to its children and set a matching attribute', () => {
    const attribute = 'iure';
    const theme = 'dark';

    const { baseElement } = render(
      <ThemeProvider
        attribute={attribute}
        defaultTheme={theme}
        storageKey="dolores"
      >
        <ComponentTest />
      </ThemeProvider>
    );

    expect(rtlScreen.getByText(new RegExp(bodyPrefix))).toHaveTextContent(
      `${bodyPrefix} ${theme}`
    );
    expect(baseElement.parentElement?.getAttribute(`data-${attribute}`)).toBe(
      theme
    );
    expect(baseElement.parentElement).toHaveStyle(`color-scheme: ${theme};`);
  });

  it('can resolve the preferred theme from user system settings', () => {
    const attribute = 'qui';
    const defaultTheme = 'system';
    const resolvedTheme = getThemeFromSystem();

    const { baseElement } = render(
      <ThemeProvider
        attribute={attribute}
        defaultTheme={defaultTheme}
        storageKey="modi"
      >
        <ComponentTest />
      </ThemeProvider>
    );

    expect(rtlScreen.getByText(new RegExp(bodyPrefix))).toHaveTextContent(
      `${bodyPrefix} ${defaultTheme}`
    );
    expect(baseElement.parentElement?.getAttribute(`data-${attribute}`)).toBe(
      resolvedTheme
    );
    expect(baseElement.parentElement).toHaveStyle(
      `color-scheme: ${resolvedTheme};`
    );
  });
});
