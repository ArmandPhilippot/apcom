import { describe, expect, it, jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import type { FormEvent } from 'react';
import { type FormSubmitValidation, useFormSubmit } from './use-form-submit';

const generateSubmitEvent = () =>
  new Event('submit', {
    bubbles: true,
    cancelable: true,
  }) as unknown as FormEvent<HTMLFormElement>;

describe('useFormSubmit', () => {
  const data = { foo: 'tempore', bar: false, baz: 42 };
  const messages = { error: 'Error', success: 'Success' };

  it('can submit the provided data', async () => {
    const { result } = renderHook(() => useFormSubmit(data));

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(4);

    expect(result.current.messages).toBeNull();
    expect(result.current.submitStatus).toBe('IDLE');

    await act(async () => {
      await result.current.submit(generateSubmitEvent());
    });

    expect(result.current.messages).toBeNull();
    expect(result.current.submitStatus).toBe('SUCCEEDED');
  });

  it('can use a callback to handle submit', async () => {
    const callback = jest.fn((_data) => undefined);
    const { result } = renderHook(() =>
      useFormSubmit(data, { submit: callback })
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(5);

    expect(callback).not.toHaveBeenCalled();
    expect(result.current.messages).toBeNull();

    await act(async () => {
      await result.current.submit(generateSubmitEvent());
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(data);
    expect(result.current.messages).toBeNull();
  });

  it('can use a callback that fails validating data on submit', async () => {
    const callback = jest.fn(
      (values: typeof data): FormSubmitValidation<typeof data> => {
        return {
          messages,
          validator: () => values.bar,
        };
      }
    );
    const { result } = renderHook(() =>
      useFormSubmit(data, { submit: callback })
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(6);

    expect(callback).not.toHaveBeenCalled();
    expect(result.current.messages).toBeNull();

    await act(async () => {
      await result.current.submit(generateSubmitEvent());
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(data);
    expect(result.current.submitStatus).toBe('FAILED');
    expect(result.current.messages).toBe(messages);
  });

  it('can use a callback that succeeds validating data on submit', async () => {
    const callback = jest.fn(
      (values: typeof data): FormSubmitValidation<typeof data> => {
        return {
          messages,
          validator: () => !values.bar,
        };
      }
    );
    const { result } = renderHook(() =>
      useFormSubmit(data, { submit: callback })
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(6);

    expect(callback).not.toHaveBeenCalled();
    expect(result.current.messages).toBeNull();

    await act(async () => {
      await result.current.submit(generateSubmitEvent());
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(data);
    expect(result.current.submitStatus).toBe('SUCCEEDED');
    expect(result.current.messages).toBe(messages);
  });

  it('can call an onSuccess callback on success', async () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useFormSubmit(data, { onSuccess: callback })
    );

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(6);

    expect(callback).not.toHaveBeenCalled();
    expect(result.current.messages).toBeNull();
    expect(result.current.submitStatus).toBe('IDLE');

    await act(async () => {
      await result.current.submit(generateSubmitEvent());
    });

    expect(result.current.messages).toBeNull();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(result.current.submitStatus).toBe('SUCCEEDED');
  });

  it('can call an onFailure callback on failure', async () => {
    const handlers = {
      onFailure: jest.fn(),
      submit: jest.fn(
        (values: typeof data): FormSubmitValidation<typeof data> => {
          return {
            messages,
            validator: () => values.bar,
          };
        }
      ),
    };
    const { result } = renderHook(() => useFormSubmit(data, handlers));

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(6);

    expect(handlers.onFailure).not.toHaveBeenCalled();
    expect(result.current.messages).toBeNull();
    expect(result.current.submitStatus).toBe('IDLE');

    await act(async () => {
      await result.current.submit(generateSubmitEvent());
    });

    expect(result.current.messages).toBe(messages);
    expect(handlers.onFailure).toHaveBeenCalledTimes(1);
    expect(result.current.submitStatus).toBe('FAILED');
  });
});
