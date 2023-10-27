import { act, renderHook } from '@testing-library/react';
import type { FC, ReactNode } from 'react';
import { MotionProvider, type MotionProviderProps } from '../../providers';
import { useReducedMotion } from './use-reduced-motion';

const createWrapper = (
  Wrapper: FC<MotionProviderProps>,
  config: MotionProviderProps
) =>
  function CreatedWrapper({ children }: { children: ReactNode }) {
    return <Wrapper {...config}>{children}</Wrapper>;
  };

describe('useReducedMotion', () => {
  it('should return the default value without provider and prevent update', () => {
    const { result } = renderHook(() => useReducedMotion());

    expect(result.current.isReduced).toBe(false);

    act(() => result.current.setIsReduced(true));

    expect(result.current.isReduced).toBe(false);

    act(() => result.current.toggleReducedMotion());

    expect(result.current.isReduced).toBe(false);
  });

  it('can update the value', () => {
    const defaultValue = true;

    const { result } = renderHook(() => useReducedMotion(), {
      wrapper: createWrapper(MotionProvider, {
        attribute: 'aperiam',
        hasReducedMotion: defaultValue,
        storageKey: 'voluptate',
      }),
    });

    expect(result.current.isReduced).toBe(defaultValue);

    const newValue = false;

    act(() => result.current.setIsReduced(newValue));

    expect(result.current.isReduced).toBe(newValue);
  });

  it('can toggle the value', () => {
    const defaultValue = false;

    const { result } = renderHook(() => useReducedMotion(), {
      wrapper: createWrapper(MotionProvider, {
        attribute: 'aperiam',
        hasReducedMotion: defaultValue,
        storageKey: 'voluptate',
      }),
    });

    expect(result.current.isReduced).toBe(defaultValue);

    act(() => result.current.toggleReducedMotion());

    expect(result.current.isReduced).toBe(!defaultValue);
  });
});
