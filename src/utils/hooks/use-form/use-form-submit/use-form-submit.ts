import { useCallback, useState, type FormEvent } from 'react';
import type { DataValidator, Maybe, Nullable } from '../../../../types';

export type FormSubmitMessages = {
  /**
   * The message to use on error.
   */
  error: string;
  /**
   * The message to use on success.
   */
  success: string;
};

export type FormSubmitValidation<T> = {
  /**
   * A callback to handle submit validation.
   */
  validator: DataValidator<T>;
  /**
   * The messages to use on failure or success.
   */
  messages: Partial<FormSubmitMessages>;
};

export type FormSubmitHandler<T> = (
  data: T
) => Maybe<FormSubmitValidation<T>> | Promise<Maybe<FormSubmitValidation<T>>>;

export type FormSubmitStatus = 'IDLE' | 'PENDING' | 'FAILED' | 'SUCCEEDED';

export type FormHandlers<T extends Record<string, unknown>> = {
  /**
   * A callback function to handle submit failure.
   */
  onFailure: () => void;
  /**
   * A callback function to handle submit success.
   */
  onSuccess: () => void;
  /**
   * A callback function to handle submit.
   */
  submit: FormSubmitHandler<T>;
};

export type UseFormSubmitReturn = {
  /**
   * The message to use on submit failure or success.
   */
  messages: Nullable<Partial<FormSubmitMessages>>;
  /**
   * A method to handle form submit.
   *
   * @param {FormEvent<HTMLFormElement>} e - The event.
   * @returns {Promise<void>}
   */
  submit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  /**
   * The submit status.
   */
  submitStatus: FormSubmitStatus;
};

/**
 * React hook to handle form submit.
 *
 * @template {object} T - The object keys should match the fields name.
 * @param {T} data - The form values.
 * @param {Partial<FormHandlers<T>>} handlers - The submit handlers.
 * @returns {UseFormSubmitReturn} A submit method, the status and messages.
 */
export const useFormSubmit = <T extends Record<string, unknown>>(
  data: T,
  handlers?: Partial<FormHandlers<T>>
): UseFormSubmitReturn => {
  const { onFailure, onSuccess, submit: submitHandler } = handlers ?? {};
  const [messages, setMessages] =
    useState<Nullable<Partial<FormSubmitMessages>>>(null);
  const [submitStatus, setSubmitStatus] = useState<FormSubmitStatus>('IDLE');

  const handleFailure = useCallback(() => {
    setSubmitStatus('FAILED');
    if (onFailure) onFailure();
  }, [onFailure]);

  const handleSuccess = useCallback(() => {
    setSubmitStatus('SUCCEEDED');
    if (onSuccess) onSuccess();
  }, [onSuccess]);

  const handleSubmit = useCallback(async () => {
    const submitResult = submitHandler ? await submitHandler(data) : undefined;

    if (!submitResult) {
      handleSuccess();
      return;
    }

    setMessages(submitResult.messages);

    const isSuccess = submitResult.validator(data);

    setSubmitStatus(isSuccess ? 'SUCCEEDED' : 'FAILED');

    if (isSuccess) handleSuccess();
    else handleFailure();
  }, [data, handleFailure, handleSuccess, submitHandler]);

  const submit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setMessages(null);
      setSubmitStatus('PENDING');

      return handleSubmit();
    },
    [handleSubmit]
  );

  return { messages, submit, submitStatus };
};
