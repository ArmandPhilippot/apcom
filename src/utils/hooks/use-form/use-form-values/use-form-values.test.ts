import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import type { ChangeEvent } from 'react';
import { useFormValues } from './use-form-values';

/**
 * Generate a new change event.
 *
 * @param {string} name - The field name.
 * @param {unknown} value - The new value of the field.
 * @returns {ChangeEvent<HTMLInputElement>} The event.
 */
const generateChangeEvent = (name: string, value: unknown, type = 'text') => {
  const ev = new Event('change');
  Object.defineProperty(ev, 'target', {
    value: {
      checked: type === 'checkbox' || type === 'radio' ? value : undefined,
      name,
      type,
      value: type === 'checkbox' || type === 'radio' ? undefined : value,
    },
    writable: false,
  });

  return ev as unknown as ChangeEvent<HTMLInputElement>;
};

describe('useFormValues', () => {
  const initialValues = {
    foo: 'hello',
    bar: false,
  };
  const newValues = {
    foo: 'world',
    bar: true,
  };

  it('can initialize the values', () => {
    const { result } = renderHook(() => useFormValues(initialValues));

    expect(result.current.values.bar).toBe(initialValues.bar);
    expect(result.current.values.foo).toBe(initialValues.foo);
  });

  it('can update and reset the values', () => {
    const { result } = renderHook(() => useFormValues(initialValues));

    act(() => {
      result.current.update(
        generateChangeEvent('bar', newValues.bar, 'checkbox')
      );
    });

    expect(result.current.values.bar).toBe(newValues.bar);

    act(() => {
      result.current.update(generateChangeEvent('foo', newValues.foo));
    });

    expect(result.current.values.foo).toBe(newValues.foo);

    act(() => {
      result.current.reset();
    });

    expect(result.current.values.bar).toBe(initialValues.bar);
    expect(result.current.values.foo).toBe(initialValues.foo);
  });
});
