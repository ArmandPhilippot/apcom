import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useTimeout } from './use-timeout';

describe('useTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('executes the given callback with default delay', () => {
    // When less than 1ms, setTimeout use 1. Default delay is 0ms.
    const defaultTimeoutDelay = 1;
    const callback = jest.fn();
    renderHook(() => useTimeout(callback));

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(defaultTimeoutDelay);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('executes the given callback with custom delay', () => {
    const customDelay = 1500;
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, customDelay));

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(customDelay);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
