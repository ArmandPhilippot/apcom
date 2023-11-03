import { useCallback, useState } from 'react';
import type { DataValidator, Nullable } from '../../../types';
import {
  type FormSubmitHandler,
  useFormSubmit,
  type UseFormSubmitReturn,
} from './use-form-submit';
import { type UseFormValuesReturn, useFormValues } from './use-form-values';

export type FormFieldValidation<T> = {
  /**
   * The error message.
   */
  error: string;
  /**
   * A function to validate the field value.
   */
  validator: DataValidator<T>;
};

export type FormValidations<T> = {
  [K in keyof T]: FormFieldValidation<T[K]>;
};

export type FormValidationErrors<T> = {
  [K in keyof T]?: string;
};

export type UseFormConfig<T> = {
  /**
   * The initial fields values.
   */
  initialValues: T;
  /**
   * A function to handle submit.
   */
  submitHandler?: FormSubmitHandler<T>;
  /**
   * An object with validator and error message to validate each field.
   */
  validations?: Partial<FormValidations<T>>;
};

export type UseFormReturn<T extends Record<string, unknown>> =
  UseFormValuesReturn<T> &
    UseFormSubmitReturn & {
      /**
       * The validation error for each field.
       */
      validationErrors: Nullable<FormValidationErrors<T>>;
    };

/**
 * React hook to manage forms.
 *
 * @template {object} T - The object keys should match the fields name.
 * @param {UseFormConfig<T>} config - The config.
 * @returns {UseFormReturn<T>} The values, validations errors and form methods.
 */
export const useForm = <T extends Record<string, unknown>>({
  initialValues,
  submitHandler,
  validations,
}: UseFormConfig<T>): UseFormReturn<T> => {
  const { values, reset, update } = useFormValues(initialValues);
  const [validationErrors, setValidationErrors] =
    useState<Nullable<FormValidationErrors<T>>>(null);

  const areValuesValid = useCallback(async () => {
    if (!validations) return true;

    const keys = Object.keys(values) as Extract<keyof T, string>[];
    const validationPromises = keys.map(async (key) => {
      const value = values[key];
      const field = validations[key];

      if (!field) return true;

      const isValidField = await field.validator(value);

      if (!isValidField)
        setValidationErrors((prevErr) => {
          const newErrors: FormValidationErrors<T> = prevErr
            ? { ...prevErr }
            : {};

          return {
            ...newErrors,
            [key]: field.error,
          };
        });

      return isValidField;
    });

    const awaitedValidation = await Promise.all(validationPromises);

    return awaitedValidation.every((isValid) => isValid);
  }, [validations, values]);

  const handleSubmit = useCallback(async () => {
    setValidationErrors(null);

    const isValid = await areValuesValid();

    if (isValid && submitHandler) return submitHandler(values);

    return {
      validator: () => isValid,
      messages: {
        error: 'Has invalid values',
      },
    };
  }, [areValuesValid, submitHandler, values]);

  const handleSuccess = useCallback(() => {
    reset();
  }, [reset]);

  const { messages, submit, submitStatus } = useFormSubmit(values, {
    onSuccess: handleSuccess,
    submit: handleSubmit,
  });

  return {
    messages,
    reset,
    submit,
    submitStatus,
    update,
    values,
    validationErrors,
  };
};
