import { describe, expect, it } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import type { ChangeEvent, FormEvent } from 'react';
import { useForm } from './use-form';

const generateSubmitEvent = () =>
  new Event('submit', {
    bubbles: true,
    cancelable: true,
  }) as unknown as FormEvent<HTMLFormElement>;

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

describe('useForm', () => {
  it('can initialize the data', () => {
    const initialValues = {
      foo: 'impedit',
      bar: 42,
    };
    const { result } = renderHook(() => useForm({ initialValues }));

    expect(result.current.values.bar).toBe(initialValues.bar);
    expect(result.current.values.foo).toBe(initialValues.foo);
  });

  it('can use a handler to validate the submit process', async () => {
    const data = {
      name: 'John',
    };
    const submitHandler = jest.fn((_data) => undefined);
    const { result } = renderHook(() =>
      useForm({
        initialValues: data,
        submitHandler,
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    await act(async () => {
      await result.current.submit(generateSubmitEvent());
    });

    expect(result.current.validationErrors).toBeNull();
    expect(submitHandler).toHaveBeenCalled();
    expect(result.current.submitStatus).toBe('SUCCEEDED');
  });

  it('can submit the data and reset to initial values', async () => {
    const data = {
      initial: {
        name: 'John',
      },
      new: {
        name: 'Phoebe',
      },
    };
    const { result } = renderHook(() =>
      useForm({
        initialValues: data.initial,
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(3);

    act(() => {
      result.current.update(generateChangeEvent('name', data.new.name));
    });

    expect(result.current.values.name).toBe(data.new.name);

    await act(async () => {
      await result.current.submit(generateSubmitEvent());
    });

    expect(result.current.submitStatus).toBe('SUCCEEDED');
    expect(result.current.values.name).toBe(data.initial.name);
  });

  it('can submit after validating the data', async () => {
    const data = {
      initial: {
        name: 'John',
      },
      new: {
        name: 'Phoebe',
      },
      errors: {
        name: 'Expect name to have at least 2 letters.',
      },
    };
    const submitHandler = jest.fn((_data) => undefined);
    const { result } = renderHook(() =>
      useForm({
        initialValues: data.initial,
        submitHandler,
        validations: {
          name: {
            error: data.errors.name,
            validator: (value) => value.length > 1,
          },
        },
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);

    act(() => {
      result.current.update(generateChangeEvent('name', data.new.name));
    });

    expect(result.current.values.name).toBe(data.new.name);

    await act(async () => {
      await result.current.submit(generateSubmitEvent());
    });

    expect(result.current.validationErrors).toBeNull();
    expect(submitHandler).toHaveBeenCalled();
    expect(result.current.submitStatus).toBe('SUCCEEDED');
  });

  it('can abort submit if data validation fails', async () => {
    const minAge = 18;
    const data = {
      initial: {
        name: 'H',
        age: 17,
      },
      errors: {
        age: `Expect age to be at least ${minAge}.`,
        name: 'Expect name to have at least 2 letters.',
      },
    };
    const submitHandler = jest.fn((_data) => undefined);
    const { result } = renderHook(() =>
      useForm({
        initialValues: data.initial,
        submitHandler,
        validations: {
          age: {
            error: data.errors.age,
            validator: (value) => value >= minAge,
          },
          name: {
            error: data.errors.name,
            validator: (value) => value.length > 1,
          },
        },
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);

    await act(async () => {
      await result.current.submit(generateSubmitEvent());
    });

    expect(result.current.validationErrors?.age).toBe(data.errors.age);
    expect(result.current.validationErrors?.name).toBe(data.errors.name);
    expect(submitHandler).not.toHaveBeenCalled();
    expect(result.current.submitStatus).toBe('FAILED');
  });

  it('can partially validate the data before submit', async () => {
    const data = {
      initial: {
        name: 'H',
        age: 17,
      },
      errors: {
        name: 'Expect name to have at least 2 letters.',
      },
    };
    const submitHandler = jest.fn((_data) => undefined);
    const { result } = renderHook(() =>
      useForm({
        initialValues: data.initial,
        submitHandler,
        validations: {
          name: {
            error: data.errors.name,
            validator: (value) => value.length > 1,
          },
        },
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);

    await act(async () => {
      await result.current.submit(generateSubmitEvent());
    });

    expect(result.current.validationErrors?.age).toBeUndefined();
    expect(result.current.validationErrors?.name).toBe(data.errors.name);
    expect(submitHandler).not.toHaveBeenCalled();
    expect(result.current.submitStatus).toBe('FAILED');
  });
});
