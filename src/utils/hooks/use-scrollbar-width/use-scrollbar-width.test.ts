import { describe, expect, it } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useScrollBarWidth } from './use-scrollbar-width';

describe('useScrollbarWidth', () => {
  it('returns the scrollbar width', () => {
    const { result } = renderHook(() => useScrollBarWidth());

    // JSdom always return 0 for measurements.
    expect(result.current).toBe(0);
  });
});
