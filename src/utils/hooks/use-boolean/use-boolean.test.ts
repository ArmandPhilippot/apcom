import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import { useBoolean } from './use-boolean';

describe('use-boolean', () => {
  it('returns the initial state', () => {
    const initialState = true;
    const { result } = renderHook(() => useBoolean(initialState));

    expect(result.current.state).toBe(initialState);
  });

  it('can set the state to false', () => {
    const { result } = renderHook(() => useBoolean());

    act(() => {
      result.current.deactivate();
    });

    expect(result.current.state).toBe(false);
  });

  it('can set the state to true', () => {
    const { result } = renderHook(() => useBoolean());

    act(() => {
      result.current.activate();
    });

    expect(result.current.state).toBe(true);
  });

  it('can switch the state', () => {
    const initialState = true;
    const { result } = renderHook(() => useBoolean(initialState));

    expect(result.current.state).toBe(initialState);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.state).toBe(!initialState);
  });
});
