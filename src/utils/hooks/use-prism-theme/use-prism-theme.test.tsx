import { describe, expect, it } from '@jest/globals';
import {
  act,
  render,
  renderHook,
  screen as rtlScreen,
} from '@testing-library/react';
import type { FC, ReactNode } from 'react';
import {
  PrismThemeProvider,
  type PrismThemeProviderProps,
} from '../../providers/prism-theme-provider';
import { usePrismTheme } from './use-prism-theme';

const codeSample1 = `const foo = 42;`;
const codeSample2 = `const bar = "baz";`;
const codeSample3 = `const baz = () => false;`;

const ComponentTest: FC = () => {
  usePrismTheme();

  return (
    <div>
      <pre className="language-js">{codeSample1}</pre>
      <pre className="language-js">{codeSample2}</pre>
      <pre>{codeSample3}</pre>
    </div>
  );
};

const createWrapper = (
  Wrapper: FC<PrismThemeProviderProps>,
  config: PrismThemeProviderProps
) =>
  function CreatedWrapper({ children }: { children: ReactNode }) {
    return <Wrapper {...config}>{children}</Wrapper>;
  };

describe('usePrismTheme', () => {
  it('should return the default value without provider and prevent update', () => {
    const defaultTheme = 'system';
    const { result } = renderHook(() => usePrismTheme());

    expect(result.current.theme).toBe(defaultTheme);

    act(() => result.current.setTheme('dark'));

    expect(result.current.theme).toBe(defaultTheme);
  });

  it('should add an attribute on pre elements when matching a Prism block', () => {
    const defaultTheme = 'light';
    const attribute = 'data-debitis';

    render(
      <PrismThemeProvider
        attribute={attribute}
        defaultTheme={defaultTheme}
        storageKey="soluta"
      >
        <ComponentTest />
      </PrismThemeProvider>
    );

    expect(rtlScreen.getByText(codeSample1)).toHaveAttribute(
      attribute,
      defaultTheme
    );
    expect(rtlScreen.getByText(codeSample2)).toHaveAttribute(
      attribute,
      defaultTheme
    );
    expect(rtlScreen.getByText(codeSample3)).not.toHaveAttribute(
      attribute,
      defaultTheme
    );
  });

  it('can update the theme value using a setter', () => {
    const defaultTheme = 'dark';

    const { result } = renderHook(() => usePrismTheme(), {
      wrapper: createWrapper(PrismThemeProvider, {
        attribute: 'consequuntur',
        defaultTheme,
        storageKey: 'deleniti',
      }),
    });

    expect(result.current.theme).toBe(defaultTheme);

    const newTheme = 'light';

    act(() => result.current.setTheme(newTheme));

    expect(result.current.theme).toBe(newTheme);
  });

  it('can toggle the theme from light to dark', () => {
    const defaultTheme = 'light';

    const { result } = renderHook(() => usePrismTheme(), {
      wrapper: createWrapper(PrismThemeProvider, {
        attribute: 'et',
        defaultTheme,
        storageKey: 'velit',
      }),
    });

    expect(result.current.theme).toBe(defaultTheme);

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe('dark');
  });

  it('can toggle the theme from dark to light', () => {
    const defaultTheme = 'dark';

    const { result } = renderHook(() => usePrismTheme(), {
      wrapper: createWrapper(PrismThemeProvider, {
        attribute: 'et',
        defaultTheme,
        storageKey: 'velit',
      }),
    });

    expect(result.current.theme).toBe(defaultTheme);

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe('light');
  });
});
