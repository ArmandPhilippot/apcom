import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { renderHook, screen as rtlScreen } from '@testing-library/react';
import { useAutofocus } from './use-autofocus';

describe('useAutofocus', () => {
  // When less than 1ms, setTimeout use 1. Default delay is 0ms.
  const defaultTimeoutDelay = 1;
  const input = document.createElement('input');
  input.type = 'text';

  beforeEach(() => {
    document.body.append(input);
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.removeChild(input);
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('gives focus to the element without condition', () => {
    const { result } = renderHook(() => useAutofocus<HTMLInputElement>());
    result.current.current = input;

    jest.advanceTimersByTime(defaultTimeoutDelay);

    expect(rtlScreen.getByRole('textbox')).toHaveFocus();
  });

  it('can give focus to the element with custom delay', () => {
    const delay = 2000;
    const { result } = renderHook(() =>
      useAutofocus<HTMLInputElement>({ delay })
    );
    result.current.current = input;

    jest.advanceTimersByTime(defaultTimeoutDelay);

    expect(rtlScreen.getByRole('textbox')).not.toHaveFocus();

    jest.advanceTimersByTime(delay);

    expect(rtlScreen.getByRole('textbox')).toHaveFocus();
  });

  it('can give focus to the element when the condition is met', () => {
    const condition = jest.fn(() => true);
    const { result } = renderHook(() =>
      useAutofocus<HTMLInputElement>({ condition })
    );
    result.current.current = input;

    jest.advanceTimersByTime(defaultTimeoutDelay);

    expect(rtlScreen.getByRole('textbox')).toHaveFocus();
    expect(condition).toHaveBeenCalledTimes(1);
  });

  it('does not give focus to the element when the condition is not met', () => {
    const condition = jest.fn(() => false);
    const { result } = renderHook(() =>
      useAutofocus<HTMLInputElement>({ condition })
    );
    result.current.current = input;

    jest.advanceTimersByTime(defaultTimeoutDelay);

    expect(rtlScreen.getByRole('textbox')).not.toHaveFocus();
    expect(condition).toHaveBeenCalledTimes(1);
  });
});
