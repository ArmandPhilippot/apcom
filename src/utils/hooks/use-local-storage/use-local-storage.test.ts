import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import { LocalStorage } from '../../../services/local-storage';
import { useLocalStorage } from './use-local-storage';

const validator = (value: unknown): value is string =>
  typeof value === 'string';

describe('useLocalStorage', () => {
  const fallback = 'fuga';
  const key = 'qui';

  it('should return the fallback value when storage is clear', () => {
    LocalStorage.clear();

    const { result } = renderHook(() =>
      useLocalStorage(key, fallback, validator)
    );

    expect(result.current[0]).toBe(fallback);
  });

  it('should return the stored value when storage is not clear', () => {
    const storedValue = 'unde';

    LocalStorage.set(key, storedValue);

    const { result } = renderHook(() =>
      useLocalStorage(key, fallback, validator)
    );

    expect(result.current[0]).toBe(storedValue);
  });

  it('should return the fallback value when the stored value is invalid', () => {
    LocalStorage.clear();

    const storedValue = 42;

    LocalStorage.set(key, storedValue);

    const { result } = renderHook(() =>
      useLocalStorage(key, fallback, validator)
    );

    expect(result.current[0]).toBe(fallback);
  });

  it('can update the stored value', () => {
    const { result } = renderHook(() =>
      useLocalStorage(key, fallback, validator)
    );
    const newValue = 'eveniet';

    act(() => result.current[1](newValue));

    expect(result.current[0]).toBe(newValue);
  });
});
