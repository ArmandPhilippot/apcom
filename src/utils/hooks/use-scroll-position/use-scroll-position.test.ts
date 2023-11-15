import { describe, expect, it } from '@jest/globals';
import { fireEvent, renderHook } from '@testing-library/react';
import { type ScrollPosition, useScrollPosition } from './use-scroll-position';

describe('useScrollPosition', () => {
  it('returns the scroll position based on window', () => {
    const { result } = renderHook(() => useScrollPosition());

    expect(result.current.x).toBe(0);
    expect(result.current.y).toBe(0);

    const newPos: ScrollPosition = {
      x: 50,
      y: 100,
    };

    fireEvent.scroll(window, { target: { scrollX: newPos.x } });

    expect(result.current.x).toBe(newPos.x);

    fireEvent.scroll(window, { target: { scrollY: newPos.y } });

    expect(result.current.y).toBe(newPos.y);
  });
});
