import { describe, expect, it, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useOnClickOutside } from './use-on-click-outside';

describe('useOnClickOutside', () => {
  it('can execute a function on click outside the given ref', async () => {
    const user = userEvent.setup();
    const cb = jest.fn();
    const wrapper = document.createElement('div');
    const el = document.createElement('div');

    wrapper.append(el);
    document.body.append(wrapper);

    const { result } = renderHook(() => useOnClickOutside<HTMLDivElement>(cb));

    result.current.current = el;

    await user.click(wrapper);

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('does not execute the callback on click inside the given ref', async () => {
    const user = userEvent.setup();
    const cb = jest.fn();
    const wrapper = document.createElement('div');
    const el = document.createElement('div');

    wrapper.append(el);
    document.body.append(wrapper);

    const { result } = renderHook(() => useOnClickOutside(cb));

    result.current.current = wrapper;

    await user.click(el);

    expect(cb).not.toHaveBeenCalled();
  });
});
