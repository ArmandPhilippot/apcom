import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useMutationObserver } from './use-mutation-observer';

describe('useMutationObserver', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('can create a new observer', () => {
    const callback = jest.fn();
    const observerSpy = jest.spyOn(MutationObserver.prototype, 'observe');
    const wrapper = document.createElement('div');
    const options: MutationObserverInit = { childList: true };

    renderHook(() =>
      useMutationObserver({
        callback,
        options,
        ref: { current: wrapper },
      })
    );

    expect(observerSpy).toHaveBeenCalledTimes(1);
    expect(observerSpy).toHaveBeenCalledWith(wrapper, options);
  });

  it('does not create a new observer when ref is null', () => {
    const callback = jest.fn();
    const observerSpy = jest.spyOn(MutationObserver.prototype, 'observe');

    renderHook(() =>
      useMutationObserver({
        callback,
        options: { childList: true },
        ref: { current: null },
      })
    );

    expect(observerSpy).not.toHaveBeenCalled();
  });
});
