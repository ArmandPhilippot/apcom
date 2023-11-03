import {
  type ChangeEventHandler,
  useCallback,
  useState,
  type ChangeEvent,
} from 'react';

const isBooleanField = (
  target: EventTarget & (HTMLInputElement | HTMLTextAreaElement)
): target is EventTarget & HTMLInputElement =>
  target.type === 'checkbox' || target.type === 'radio';

export type UseFormValuesReturn<T extends Record<string, unknown>> = {
  /**
   * A method to reset the fields to their initial values.
   *
   * @returns {void}
   */
  reset: () => void;
  /**
   * A method to handle input or textarea update.
   *
   * @param {ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} e - The event.
   * @returns {void}
   */
  update: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  /**
   * The fields values.
   */
  values: T;
};

/**
 * React hook to handle form values update and reset.
 *
 * @template {object} T - The object keys should match the fields name.
 * @param {T} initialValues - The fields initial values.
 * @returns {UseFormValuesReturn<T>} An object with values and two methods.
 */
export const useFormValues = <T extends Record<string, unknown>>(
  initialValues: T
): UseFormValuesReturn<T> => {
  const [values, setValues] = useState(initialValues);

  /**
   * Reset the field to their initial values.
   */
  const reset = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  /**
   * Handle input and textarea update.
   *
   * @param {ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} e - The event.
   * @returns {void}
   */
  const update: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =
    useCallback(({ target }) => {
      setValues((prevData) => {
        return {
          ...prevData,
          [target.name]: isBooleanField(target) ? target.checked : target.value,
        };
      });
    }, []);

  return { values, reset, update };
};
