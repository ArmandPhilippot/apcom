import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import { useToggle } from './use-toggle';

describe('use-toggle', () => {
  it('returns the default state', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);
  });

  it('can switch the state', () => {
    const initialState = true;
    const { result } = renderHook(() => useToggle(initialState));

    expect(result.current[0]).toBe(initialState);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(!initialState);
  });
});
