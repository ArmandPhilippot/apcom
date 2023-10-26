import { useEffect, useState } from 'react';
import { LocalStorage } from '../../../services/local-storage';
import type { Validator } from '../../../types';

const getInitialValueOrFallback = <T>(
  key: string,
  fallbackValue: T,
  validator: Validator<T>
) => {
  if (typeof window === 'undefined') return fallbackValue;
  const storedValue = LocalStorage.get(key);

  return validator(storedValue) ? storedValue : fallbackValue;
};

/**
 * Use the local storage.
 *
 * @param {string} key - The storage local key.
 * @param {T} fallbackValue - A fallback value if local storage is empty.
 * @param {Validator<T>} validator - A function to validate the stored value.
 * @returns A tuple with the value and a setter.
 */
export const useLocalStorage = <T>(
  key: string,
  fallbackValue: T,
  validator: Validator<T>
) => {
  const [value, setValue] = useState(
    getInitialValueOrFallback(key, fallbackValue, validator)
  );

  useEffect(() => {
    LocalStorage.set(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};
