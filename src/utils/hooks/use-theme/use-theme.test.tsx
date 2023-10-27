import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import type { FC, ReactNode } from 'react';
import { ThemeProvider, type ThemeProviderProps } from '../../providers';
import { useTheme } from './use-theme';

const createWrapper = (
  Wrapper: FC<ThemeProviderProps>,
  config: ThemeProviderProps
) =>
  function CreatedWrapper({ children }: { children: ReactNode }) {
    return <Wrapper {...config}>{children}</Wrapper>;
  };

describe('useTheme', () => {
  it('should return the default value without provider and prevent update', () => {
    const defaultTheme = 'system';
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe(defaultTheme);

    act(() => result.current.setTheme('dark'));

    expect(result.current.theme).toBe(defaultTheme);
  });

  it('can update the value', () => {
    const defaultTheme = 'dark';

    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper(ThemeProvider, {
        attribute: 'magnam',
        defaultTheme,
        storageKey: 'repellat',
      }),
    });

    expect(result.current.theme).toBe(defaultTheme);

    const newTheme = 'light';

    act(() => result.current.setTheme(newTheme));

    expect(result.current.theme).toBe(newTheme);
  });

  it('can toggle the theme from dark to light', () => {
    const defaultTheme = 'dark';

    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper(ThemeProvider, {
        attribute: 'voluptatibus',
        defaultTheme,
        storageKey: 'qui',
      }),
    });

    expect(result.current.theme).toBe(defaultTheme);

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe('light');
  });

  it('can toggle the theme from light to dark', () => {
    const defaultTheme = 'light';

    const { result } = renderHook(() => useTheme(), {
      wrapper: createWrapper(ThemeProvider, {
        attribute: 'sed',
        defaultTheme,
        storageKey: 'ut',
      }),
    });

    expect(result.current.theme).toBe(defaultTheme);

    act(() => result.current.toggleTheme());

    expect(result.current.theme).toBe('dark');
  });
});
